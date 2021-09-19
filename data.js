// extract raw data from csv file into an array of hotel names

async function fromCSV(url) {
    let response = await axios.get(url);
    let output = await csv().fromString(response.data);
    return output;
}

// let staycayHotelsJson = async() => {
//     let output = await fromCSV('data-source/staycay-hotels.csv');
//     return output;
// };

// extract raw data from XML and create an array of objects, each object contains essential info of 1 hotel

async function fromXML(url) {

    let response = await axios.get(url, { responseType: 'document' });
    let xmlDoc = response.data;
    let xmlHotelList = Array.from(xmlDoc.documentElement.children[0].children[3].children);

    // exclude the first item of the array, as it's not an element of hotel data
    xmlHotelList.shift();

    let hotelList = [];
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
        hotelList.push(oneHotel);
    }
    return hotelList;
}

// get coordinates for stay-home-notice hotels from hotelList array
// create an array of stay-home-notice hotels not matched
async function getShnHotelList() {
    let shnHotelsRaw = await fromCSV('data-source/SHN-hotels.csv');
    let hotelList = await fromXML('data-source/hotel-locations.kml');
    let unmatchedShnHotels = [];
    let shnHotelList = [];

    for (let s of shnHotelsRaw) {
        let matched = false;
        let currentName = s['Hotel Name'];
        if (currentName != '') {
            for (let h of hotelList) {
                if (currentName === h.NAME) {
                    matched = true;
                    let matchedHotel = {};
                    matchedHotel.NAME = h.NAME;
                    matchedHotel.COORDINATES = h.COORDINATES;
                    matchedHotel.POSTALCODE = h.POSTALCODE;
                    matchedHotel.ADDRESS = h.ADDRESS;
                    shnHotelList.push(matchedHotel);
                    break;
                };
            };
            if (!matched) {
                unmatchedShnHotels.push(s);
            }
        }
    }

    console.log('after for loop, shnHotelList is ', shnHotelList);
    console.log('unmatchedShnHotels is ', unmatchedShnHotels);
};

// getShnHotelList();

// get coordinates for staycation hotels from hotelList array


// get coordinates from FourSquare API for covid clusters


// get coordinates from data.gov API for dengue clusters9fdf