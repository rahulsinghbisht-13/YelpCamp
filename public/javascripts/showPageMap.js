mapboxgl.accessToken = 'pk.eyJ1IjoicmFodWwtc2luZ2gtYmlzaHQiLCJhIjoiY2t0dmt2dTB4MHQ2MDJwcXQwNnJxaXRtbiJ9.-nQPDqSY1FdZ8N8osyj7Dw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 7 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({ color: 'red', rotation: 0 })
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)