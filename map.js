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
        zoomToResult: true,
        placeholder: "Enter an address or place e.g. Chinatown Complex",
        useMapBounds: true,
        expanded: false,
        collapseAfterResult: true,
        allowMultipleResults: true,
        searchBounds: null,
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

    // create custom markers for hotels
    let hotelIcon = L.Icon.extend({
        options: {
            shadowUrl: 'images/marker-shadow.png',
            iconSize: [38, 38],
            shadowSize: [30, 30],
            iconAnchor: [22, 38],
            shadowAnchor: [15, 40],
            popupAnchor: [-3, -76]
        }
    });

    let allHotelIcon = new hotelIcon({ iconUrl: 'images/marker-all-hotels.png' }),
        staycayIcon = new hotelIcon({ iconUrl: 'images/marker-staycation-hotels.png' }),
        shnIcon = new hotelIcon({ iconUrl: 'images/marker-shn-hotels.png' }),
        nonShnStaycayIcon = new hotelIcon({ iconUrl: 'images/marker-nonshnstaycation-hotels.png' });


    // add 4 layer group of all hotels. SHN hotels, staycay hotels, non-SHN staycay hotels.
    let masterHotelLists = await getMasterHotelLists();

    function createHotelLayer(hotelList, fileType) {
        let hotelLayer = L.markerClusterGroup();
        let hotelMarker = '';
        for (let hotel of hotelList) {
            switch (fileType) {
                case 'all':
                    hotelMarker = L.marker(hotel.COORDINATES, { icon: allHotelIcon });
                    break;
                case 'staycay':
                    hotelMarker = L.marker(hotel.COORDINATES, { icon: staycayIcon });
                    break;
                case 'shn':
                    hotelMarker = L.marker(hotel.COORDINATES, { icon: shnIcon });
                    break;
                case 'nonshnstaycay':
                    hotelMarker = L.marker(hotel.COORDINATES, { icon: nonShnStaycayIcon });
                    break;
                default:
                    console.log('fileType does not match custom icon name. default icon created');
                    hotelMarker = L.marker(hotel.COORDINATES);
            }

            let popup = L.popup({ minWidth: 400 }).setContent(`
            <table class="hotel">
            <tr><th>Hotel ${hotel.DESCRIPTION[4].key}: </th><td>${hotel.DESCRIPTION[4].value}</td></th>
            <tr><th>${hotel.DESCRIPTION[3].key}: </th><td>${hotel.DESCRIPTION[3].value}</td></th>
            <tr><th>${hotel.DESCRIPTION[2].key}: </th><td>${hotel.DESCRIPTION[2].value}</td></th>               
            <tr><th>${hotel.DESCRIPTION[1].key}: </th><td>${hotel.DESCRIPTION[1].value}</td></th> 
            <tr><th>Email: </th><td>${hotel.DESCRIPTION[0].value}</td></th>
            <tr><th>Approved for Staycation?</th><td>${hotel.STAYCAY}</td></th>
            <tr><th>Open for Stay-Home-Notice?</th><td>${hotel.SHN}</td></th>
            </table>
            `);
            hotelMarker.bindPopup(popup);
            hotelMarker.addTo(hotelLayer);
        }
        return hotelLayer;
    }

    const allHotelsLayer = createHotelLayer(masterHotelLists.all, 'all');
    const staycayHotelsLayer = createHotelLayer(masterHotelLists.staycay, 'staycay');
    const shnHotelsLayer = createHotelLayer(masterHotelLists.shn, 'shn');
    const nonShnStaycayLayer = createHotelLayer(masterHotelLists.nonShnStaycay, 'nonshnstaycay');

    // add a layer group of covid clusters
    let clusterwithDate = await getCovidClusterList('data-source/covid-clusters23Sep2021.csv');
    // console.log('covidclusters object is ', clusterwithDate);
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

        covidCluster.bindPopup(`<table>
                                <tr><th>Covid-19 Cluster Name: </th><td>${c.ClusterName}</td></tr>
                                <tr><th>Address: </th><td>${c.Address[0].address}</td></tr>
                                <tr><th>New Cases on ${newCaseDate}: </th><td>${c.NumberOfNewCases}</td></tr>
                                <tr><th>Total Cases by ${newCaseDate}: </th><td>${c.TotalCases}</td></tr>
                                <tr><th>Remarks: </th><td>${c.Remarks}</td></tr>
                                </table>`);
        covidCluster.addTo(covidClusterLayer);
    }

    // add a layer of dengue clusters to the map
    let response = await axios.get('data-source/dengue-clusters-geojson.geojson');
    let dengueClusterLayer = L.geoJson(response.data, {
        onEachFeature: function(feature, layer) {
            let cdata = cdataToHTML(feature.properties.Description, 'dengue');
            // convert FMEL_UPD_D string to date string
            let rawDateString = cdata[3].value.substring(0, 8);
            let newDateFormat = new Date(`${rawDateString.slice(0, 4)}/${rawDateString.slice(4, 6)}/${rawDateString.slice(6, 8)}`);
            let newDateString = newDateFormat.toDateString().substring(4);
            layer.bindPopup(`<table>
                            <thead><strong>${cdata[2].value}</strong></thead>
                            <tr><th>Area: </th><td>${cdata[0].value}</td></tr>
                            <tr><th>Total Cases by ${newDateString}: </th><td>${cdata[1].value}</td></tr>
                            </table>`);
        }
    });

    // create a layer control on the map
    let baseLayer = {
        'Staycation Hotels': staycayHotelsLayer,
        'Stay-Home-Notice(SHN) Hotels': shnHotelsLayer,
        'Non-SHN Staycation Hotels': nonShnStaycayLayer,
        "All Hotels": allHotelsLayer
    };

    let overLay = {
        'Dengue Clusters': dengueClusterLayer,
        'COVID-19 Clusters': covidClusterLayer
    }

    L.control.layers(baseLayer, overLay).addTo(map);

    // improve the popup with better info in a table

})