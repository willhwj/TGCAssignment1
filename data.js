// a function to extract raw data from csv file into an array of hotel names
async function fromCSV(url) {
    let response = await axios.get(url);
    let output = await csv().fromString(response.data);
    return output;
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

let str1 = `Resorts World Sentosa – Crockfords Tower`;
let newName1 = cleanseName(str1);
let str2 = `Crockfords Tower`;
let newName2 = cleanseName(str2);
console.log(newName1);
console.log(newName2);

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
        let coordinatesLngLat = coordinatesLatLng.split(',');
        coordinatesLngLat.splice(2, 1);
        coordinatesLngLat[0] = parseFloat(coordinatesLngLat[0]);
        coordinatesLngLat[1] = parseFloat(coordinatesLngLat[1]);
        oneHotel.COORDINATES = coordinatesLngLat;

        // add the hotel object to hotelList array
        stbHotelList.push(oneHotel);
    }
    return stbHotelList;
}

// a function to get coordinates for hotels based on hotelList array from XML file provided by STB 
// also create an array of stay-home-notice hotels not matched
// return an array of matched hotels
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
                    hotelList.push(matchedHotel);
                    break;
                };
            };
            if (!matched) {
                unmatchedHotels.push(s);
            }
        }
    }
    console.log('after for loop, hotelList is ', hotelList);
    console.log('unmatchedHotels is ', unmatchedHotels);
    return hotelList;
};

getCoordinates('data-source/SHN-hotels.csv');

getCoordinates('data-source/staycay-hotels.csv');

// get coordinates from FourSquare API for covid clusters


// get coordinates from data.gov API for dengue clusters9fdf