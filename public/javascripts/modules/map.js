import axios from 'axios'

function loadPlaces(map, lat = 43.2363513784371, lng = 76.9457906484604) {
	
}

function makeMap(mapDiv) {
	if (!mapDiv) return;
	mapboxgl.accessToken = 'pk.eyJ1Ijoia2E0YW5iZWsiLCJhIjoiY2pvcHhpcW5uMDZoZTNya3dpdXkzaDQ3eCJ9.urptUPgdj8mxbDckQVPitA';
	var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [76.9457906484604, 43.2363513784371], // starting position [lng, lat]
    zoom: 12 // starting zoom
	});
}

export default makeMap;