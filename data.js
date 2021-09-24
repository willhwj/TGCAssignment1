// a function to extract raw data from csv file into an array of hotel names
async function fromCSV(url) {
    let response = await axios.get(url);
    let output = await csv().fromString(response.data);
    return output;
}

// // a function to structure object returned from fromCSV function for covid cluster into an array of objects
async function getCovidClusterList(url) {
    let rawObj = await fromCSV('data-source/covid-clusters21Sep2021.csv');
    let finalObj = {
        date: Object.keys(rawObj[0])[0],
        clusterList: []
    };
    let i = 0;
    let eachObj = {};
    for (let r of rawObj) {

        if (i > 3 && i % 4 === 0) {
            eachObj['ClusterName'] = r[Object.keys(r)[0]];
            console.log('current covid cluster is ', eachObj.ClusterName);
            eachObj.Address = await getAddressCovidCluster(eachObj.ClusterName);
        }
        if (i > 3 && i % 4 === 1) {
            eachObj[`NumberOfNewCases`] = r[Object.keys(r)[0]];
        }
        if (i > 3 && i % 4 === 2) {
            eachObj['TotalCases'] = r[Object.keys(r)[0]];
        }
        if (i > 3 && i % 4 === 3) {
            eachObj['Remarks'] = r[Object.keys(r)[0]];
            finalObj.clusterList.push(eachObj);
            eachObj = {};
        }
        i++;
    }
    console.log(finalObj);
    return finalObj;
}

// a function to get list of address candidates for one covid cluster
async function getAddressCovidCluster(clusterName) {
    let addressList = [];

    //  first search via OneMap API
    let endpoint = 'https://developers.onemap.sg/commonapi/search?';
    let response = await axios.get(endpoint, {
        params: {
            searchVal: clusterName,
            returnGeom: 'Y',
            getAddrDetails: 'Y',
            pageNum: 1
        }
    });

    if (response.data.found != 0) {
        let results = response.data.results;
        for (let r of results) {
            let addDetail = {};
            addDetail.name = r.BUILDING;
            addDetail.address = r.ADDRESS;
            addDetail.postal = r.POSTAL;
            addDetail.coordinate = [parseFloat(r.LATITUDE), parseFloat(r.LONGTITUDE)];
            addressList.push(addDetail);
        }
    }
    // if no result, 2nd search via Esri Arcgis API
    else {
        console.log('enter 2nd search via Esri');
        endpoint = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?';
        response = await axios.get(endpoint, {
            params: {
                SingleLine: clusterName,
                f: 'JSON',
                city: 'Singapore',
                countryCode: 'SG',
                outFields: 'Place_addr, Postal'
            }
        });

        if (response.data.candidates.length != 0) {
            results = response.data.candidates;
            for (let r of results) {
                let addDetail = {};
                addDetail.name = r.address;
                addDetail.address = r.attributes.Place_addr;
                addDetail.postal = r.attributes.Postal;
                addDetail.coordinate = [parseFloat(r.location.y), parseFloat(r.location.x)];
                addressList.push(addDetail);
            }
        }
        //  if no result, 3rd search via FourSquare API 
        else {
            console.log('enter 3rd search via FourSquare');
            endpoint = 'https://api.foursquare.com/v2/venues/search';
            response = await axios.get(endpoint, {
                params: {
                    near: 'Singapore, SG',
                    client_id: 'N2PP1USWA513HVL2SJDAVVOW2WCEV2DNPSOIUVK2T1XLLKQP',
                    client_secret: 'VPKUG3K1D1VKGLOD2NHDMWHGV32NNDVQZMJ33Q1BGRGTRIUT',
                    v: '20210901',
                    query: clusterName,
                    limit: 10,
                    radius: 25000
                }
            });
            results = response.data.response.venues;
            for (let r of results) {
                let addDetail = {};
                addDetail.name = r.name;
                addDetail.address = r.location.address;
                addDetail.coordinate = [r.location.lat, r.location.lng];
                addressList.push(addDetail);
            }
        }
    }
    return addressList;
}

// a function to cleanse hotel name for better matching - remove the following: Singapore, dash(-), comma(,), resorts world sentosa, convert all to small letters.
function cleanseName(rawHotelName) {
    let cleanName = rawHotelName.toLowerCase();

    let regExp1 = new RegExp(/(singapore|sentosa|resorts world sentosa|the|hotels*|collections*[\w\s]*|autograph|pte ltd)/, 'g');
    cleanName = cleanName.replace(regExp1, '');

    let regExp2 = new RegExp(/ (by)[\s][\w\s]+/, 'g');
    cleanName = cleanName.replace(regExp2, ' ');

    let regExp3 = new RegExp(/[\s-–,'’@s!().]+/, 'g');
    cleanName = cleanName.replace(regExp3, '');

    return cleanName;
}

// a function to extract raw data from XML list of hotels by STB and create an array of objects, each object contains essential info of 1 hotel
async function fromXML(url) {

    let response = await axios.get(url, { responseType: 'document' });
    let xmlDoc = response.data;
    let xmlHotelList = Array.from(xmlDoc.documentElement.children[0].children[3].children);

    // exclude the first item of the array, as it's not an element of hotel data
    xmlHotelList.shift();

    let stbHotelList = [];
    for (let hotel of xmlHotelList) {
        // create a json object to store all SimpleData elements of 1 hotel
        let oneHotel = {};
        //  get the list of SimpleData elements as an array
        let elements = Array.from(hotel.children[3].firstElementChild.children);
        for (let e of elements) {
            let newKey = e.getAttribute('name');
            oneHotel[`${newKey}`] = e.childNodes[0].nodeValue;
        };
        // get the coordinates and store as an array of long lat
        let coordinatesLatLng = hotel.children[4].firstElementChild.childNodes[0].nodeValue;
        coordinatesLatLng = coordinatesLatLng.split(',');
        coordinatesLatLng.splice(2, 1);
        let coordinatesLngLat = [];
        coordinatesLngLat[0] = parseFloat(coordinatesLatLng[1]);
        coordinatesLngLat[1] = parseFloat(coordinatesLatLng[0]);
        oneHotel.COORDINATES = coordinatesLngLat;
        // get hotel description/ CDATA
        oneHotel.DESCRIPTION = hotel.children[2].textContent;
        // add the hotel object to hotelList array
        stbHotelList.push(oneHotel);
    }
    return stbHotelList;
}

// a function to get coordinates for hotels based on hotelList array from XML file provided by STB 
// also create an array of stay-home-notice hotels not matched, return an array of matched hotels
async function getCoordinates(targetURL) {
    let hotelsRaw = await fromCSV(targetURL);
    let stbHotelList = await fromXML('data-source/hotel-locations.kml');
    let unmatchedHotels = [];
    let hotelList = [];

    for (let s of hotelsRaw) {
        let matched = false;
        let currentName = s['Hotel Name'];
        if (currentName != '') {
            for (let h of stbHotelList) {
                let cleanTargetName = cleanseName(s['Hotel Name']);
                let cleanStbName = cleanseName(h.NAME);

                if (cleanTargetName === cleanStbName || cleanTargetName.includes(cleanStbName) || cleanStbName.includes(cleanTargetName)) {
                    matched = true;
                    let matchedHotel = {};
                    matchedHotel.NAME = h.NAME;
                    matchedHotel.COORDINATES = h.COORDINATES;
                    matchedHotel.POSTALCODE = h.POSTALCODE;
                    matchedHotel.ADDRESS = h.ADDRESS;
                    matchedHotel.DESCRIPTION = h.DESCRIPTION;
                    hotelList.push(matchedHotel);
                    break;
                };
            };
            if (!matched) {
                unmatchedHotels.push(s);
            }
        }
    }
    console.log('after for loop, matched hotelList is ', hotelList);
    console.log('unmatchedHotels is ', unmatchedHotels);
    return hotelList;
};

// get coordinates from FourSquare API for covid clusters