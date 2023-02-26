async function main() {

    function init() {
        map = initMap();
        // see note 1
        let searchResultLayer = L.layerGroup();
        window.addEventListener('DOMContentLoaded', () => {
            
            document.querySelector('#search-btn').addEventListener('click', async ()=>{
                let query = document.querySelector('#search-input').value;
                let center = map.getBounds().getCenter();
                let results = await search(center.lat, center.lng, query);

                searchResultLayer.clearLayers();

                // see note 2
                for (let eachVenue of results.location) {
                    let coordinate = [ eachVenue.geocodes.main.latitude, eachVenue.geocodes.main.longitude ];
                    let marker = L.marker(coordinate);
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>`)
                    searchResultLayer.addLayer(marker)
                    marker.addTo(searchResultLayer);

                    // add the search result to #search-results
                    let resultElement = document.createElement('div');
                    resultElement.className="search-result";
                    resultElement.innerHTML = eachVenue.name;

                    resultElement.addEventListener('click', function(){
                        map.flyTo(coordinate, 16);
                        marker.openPopup();
                    })

                    searchResultElement.appendChild(resultElement);
                }



                // display the search result layer if it is not displayed
                // see note 3
                if (!map.hasLayer(searchResultLayer)) {
                    map.addLayer(searchResultLayer);
                }
            })
        })
    };



    init();
}





main();