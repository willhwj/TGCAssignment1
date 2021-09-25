window.addEventListener('DOMContentLoaded', async function() {

    const map = L.map('map').setView([1.3521, 103.8198], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoid2lsbGh3aiIsImEiOiJja3RoMTBvOXAwbmVtMnBydGFkcXFkbmRmIn0.JIAa-tRJ8OGxwsucNfQffQ'
    }).addTo(map);

    // add a search box for free text search
    const apiKey = "AAPKfec8b2a8202441128940982c1ee70260VX-0kMk_0Y6BEFcDwLRAPgAisl9NMvGoq7wmtWdj-xIfX58JySrVL-BXMWUSlfZZ";
    const basemapEnum = "ArcGIS:Navigation";

    L.esri.Vector.vectorBasemapLayer(basemapEnum, {
        apiKey: apiKey
    }).addTo(map);

    const searchControl = L.esri.Geocoding.geosearch({
        position: "topright",
        placeholder: "Enter an address or place e.g. 1 Paya Lebar",
        useMapBounds: false,
        providers: [L.esri.Geocoding.arcgisOnlineProvider({
            apikey: apiKey,
            nearby: {
                lat: 1.2826,
                lng: 103.8431
            },
        })]
    }).addTo(map);

    const results = L.layerGroup().addTo(map);

    searchControl.on("results", (data) => {
        console.log('data object from Esri searchControl function is ', data);
        results.clearLayers();
        for (let i = data.results.length - 1; i >= 0; i--) {
            const lngLatString = `${Math.round(data.results[i].latlng.lng * 100000) / 100000}, ${Math.round(data.results[i].latlng.lat * 100000) / 100000}`;
            const marker = L.marker(data.results[i].latlng);
            marker.bindPopup(`<b>${lngLatString}</b><p>${data.results[i].properties.LongLabel}</p>`)
            results.addLayer(marker);
            marker.openPopup();
        }
    });

    let allHotels = await fromXML('data-source/hotel-locations.kml');
    // let staycayHotels = await getCoordinates('data-source/staycay-hotels.csv');
    // let shnHotels = await getCoordinates('data-source/SHN-hotels.csv')

    // a function to create marker cluster for a group of hotels based on data source
    function createHotelLayer(hotelList) {
        let hotelLayer = L.markerClusterGroup();
        for (let hotel of hotelList) {
            let hotelMarker = L.marker(hotel.COORDINATES);
            hotelMarker.bindPopup(hotel.DESCRIPTION);
            hotelMarker.addTo(hotelLayer);
        }
        hotelLayer.addTo(map);
    }

    createHotelLayer(allHotels);
    // createHotelLayer(staycayHotels);
    // createHotelLayer(shnHotels);

    // add a layer group of covid clusters
    let clusterwithDate = await getCovidClusterList('data-source/covid-clusters23Sep2021.csv');
    console.log('covidclusters object is ', clusterwithDate);
    let newCaseDate = clusterwithDate.date;
    let covidClusterList = clusterwithDate.clusterList;
    let covidClusterLayer = L.markerClusterGroup();
    for (let c of covidClusterList) {
        let covidCluster = L.circle([c.Address[0].coordinate[0], c.Address[0].coordinate[1]], {
            color: 'red',
            fillColor: 'orange',
            fillOpacity: 0.5,
            radius: 700
        })
        covidCluster.addTo(map);
        covidCluster.bindPopup(`<table>
                                <tr><th>Cluster Name: </th><td>${c.ClusterName}</td></tr>
                                <tr><th>Address: </th><td>${c.Address[0].address}</td></tr>
                                <tr><th>New Cases on ${newCaseDate}: </th><td>${c.NumberOfNewCases}</td></tr>
                                <tr><th>Total Cases by ${newCaseDate}: </th><td>${c.TotalCases}</td></tr>
                                <tr><th>Remarks: </th><td>${c.Remarks}</td></tr>
                                </table>`);
    }

    // add a layer of dengue clusters to the map
    let response = await axios.get('data-source/dengue-clusters-geojson.geojson');
    let dengueClusterLayer = L.geoJson(response.data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.Description);
        }
    }).addTo(map);

    // create a filter on the map - layerControl, layMap

    // improve the popup with better info in a table

})