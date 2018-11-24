import axios from 'axios';
import { $, $$ } from './bling';

function searchResultsHTML(results) {
  return results.map(result => {
    return `
      <p class="item" 
          data-lat="${result.center[1]}" 
          data-lng="${result.center[0]}">${result.place_name}</p>
    `;
  }).join('');
}


function autocomplete(input, lng, lat) {

  if (!input) return; 

  input.addEventListener('input', function() {
    // console.log(this.value)
    if (this.value !== "") {
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.value}.json?access_token=pk.eyJ1Ijoia2E0YW5iZWsiLCJhIjoiY2pvcHhpcW5uMDZoZTNya3dpdXkzaDQ3eCJ9.urptUPgdj8mxbDckQVPitA&autocomplete=true`)
        .then(res => {
          const places = [];
          res.data.features.map(place => places.push(place));
          return places;
        })
        .then(res => {
          document.querySelector('.address_dropdown').innerHTML = searchResultsHTML(res)
          const items = document.querySelectorAll('.address_dropdown p.item');
          items.map((item) => {
            item.addEventListener('click', (e) => {
              document.querySelector('#lat').value = e.target.dataset.lat;
              document.querySelector('#lng').value = e.target.dataset.lng;
              document.querySelector('#address').value = e.target.innerHTML;
              document.querySelector('.address_dropdown').innerHTML = '';
            })
          })
        });
    }
  })
}


export default autocomplete
// const enpoint = 
// `https://api.mapbox.com/geocoding/v5/mapbox.places/alma.json?
// access_token=pk.eyJ1Ijoia2E0YW5iZWsiLCJhIjoiY2pvcHhpcW5uMDZoZTNya3dpdXkzaDQ3eCJ9.urptUPgdj8mxbDckQVPitA&autocomplete=true`
