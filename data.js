// extract raw data from csv file

async function csvToJson(url) {
    let response = await axios.get(url);
    let json = await csv().fromString(response.data);
    console.log('CSV file contains ', json)
    return json;
}

let staycayHotelsJson = async() => {
    let output = await csvToJson('data-source/staycay-hotels.csv');
    console.log('output is ', output);
    return output;
};

staycayHotelsJson();

// extract raw data from XML and create an array of objects, each object contains essential info of 1 hotel

async function toJson(url) {

    let response = await axios.get(url, { responseType: 'document' });
    let xmlDoc = response.data;
    let xmlHotelList = xmlDoc.documentElement.children[0].children[3].children;

    let hotelList = [];
    for (let hotel of xmlHotelList) {
        //  get the list of SimpleData elements as an array
        let elements = xmlHotelList[1].children[3].firstElementChild.children;
        // get the coordinates and store as an array of long lat
        let coordinatesLatLng = xmlHotelList[1].children[4].firstElementChild.childNodes[0].nodeValue;
        let coordinatesLngLat = coordinatesLatLng.split(',');
        coordinatesLngLat.splice(2, 1);

        // create a json object to store all SimpleData elements of 1 hotel
        let oneHotel = {};
        for (let e of elements) {
            let newKey = e.getAttribute('name');
            oneHotel[`${newKey}`] = e.childNodes[0].nodeValue;
        }
        oneHotel.COORDINATES = coordinatesLngLat;

        // add the hotel object to hotelList array
        hotelList.push(oneHotel);
    }

    console.log('hotel list array is ', hotelList);
    return hotelList;
}

console.log('check');
let allHotelsJson = toJson('data-source/hotel-locations.kml');