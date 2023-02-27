async function main() {

    function init() {
        const map = initMap();
        // see note 1
        let searchResultLayer = L.layerGroup();
        window.addEventListener('DOMContentLoaded', () => {
            
            document.querySelector('#search-btn').addEventListener('click', async ()=>{
                console.log("button clicked!");
                let query = document.querySelector('#search-input').value;
                let center = map.getBounds().getCenter(); // why? maybe reconsider
                let response = await search(center.lat, center.lng, query);
                
                //console.log(response);
                
                searchResultLayer.clearLayers();

                // see note 2
                for (let eachVenue of response.results) {
                    // console.log(eachVenue)
                    let coordinate = [ eachVenue.geocodes.main.latitude, eachVenue.geocodes.main.longitude ];
                    let marker = L.marker(coordinate);
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>`)
                    searchResultLayer.addLayer(marker)
                    marker.addTo(searchResultLayer);

                    // add the search result to #search-results
                    let resultElement = document.createElement('div');
                    let searchResultElement = document.querySelector('#searchResultElement');
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