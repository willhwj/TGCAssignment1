// extract raw data from csv file

async function csvToJson(url) {
    let response = await axios.get(url);
    let json = await csv().fromString(response.data);
    console.log('CSV file contains ', json)
    return json;
}

let staycayHotelsJson = csvToJson('data-source/staycay-hotels.csv');

// extract raw data from XML & JSON file, and API

async function toJson() {
    let response = await axios.get(url);
    let json = response.data;
    console.log('XML/JSON/API contains ', json);
    return json;
}

let allHotelsJson = toJson('data-source/hotels.kml');