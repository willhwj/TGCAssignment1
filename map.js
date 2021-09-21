window.addEventListener('DOMContentLoaded', async function() {

    let map = L.map('map').setView([1.3521, 103.8198], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoid2lsbGh3aiIsImEiOiJja3RoMTBvOXAwbmVtMnBydGFkcXFkbmRmIn0.JIAa-tRJ8OGxwsucNfQffQ'
    }).addTo(map);

    let staycayHotels = L.marker([1.2993, 103.8582]);
    staycayHotels.addTo(map);
    staycayHotels.bindPopup("<p>Andaz Singapore</p>");

    // create marker cluster for all staycation hotels
    let staycayHotelLayer = L.markerClusterGroup();
    let allStaycayHotels = await getCoordinates('data-source/staycay-hotels.csv');

    for (let i = 0; i < allStaycayHotels.length; i++) {
        let pos = allStaycayHotels[i].COORDINATES;
        let info = allStaycayHotels[i].DESCRIPTION;

        let hotelMarker = L.marker(pos);
        hotelMarker.bindPopup(info);
        hotelMarker.addTo(staycayHotelLayer);
    }
    staycayHotelLayer.addTo(map);

    let covidClusters = L.circle([1.2826, 103.8431], {
        color: 'red',
        fillColor: 'orange',
        fillOpacity: 0.5,
        radius: 700
    })
    covidClusters.addTo(map);
    covidClusters.bindPopup('<p>Chinatown Complex Cluster<p>');
})