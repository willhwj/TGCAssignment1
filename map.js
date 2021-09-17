window.addEventListener('DOMContentLoaded', function() {

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
    // staycayHotels.addEventListener("click", function() {
    //     alert("This is Andaz Singapore!");
    // })

    let covidClusters = L.circle([1.2826, 103.8431], {
        color: 'red',
        fillColor: 'orange',
        fillOpacity: 0.5,
        radius: 500
    })
    covidClusters.addTo(map)
})