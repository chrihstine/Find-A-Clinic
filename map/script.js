//creating layer
let dentistLayer = L.markerClusterGroup({
    iconCreateFunction: function(cluster){
        return L.divIcon({
            html:`<div class="dentistMarkerIcon">
            ${cluster.getChildCount()}
            </div>`
        })
    }
});

dentistLayer.addTo(map);

//icon
const dentistIcon = L.icon({
    iconUrl: 'images/dentistIcon.png',
    iconSize: [45,45],
    iconAnchor:[23,45],
    popupAnchor: [0,0]
})

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
                
                let dentistResponse = await search(center.lat, center.lng, query, 15007);
                let tcmResponse = await search(center.lat, center.lng, query, 15003);
                let gpResponse = await search(center.lat, center.lng, query, 15011);
                //console.log(response);
                console.log(dentistResponse.results);
                console.log(tcmResponse.results);
                console.log(gpResponse.results);
                
                searchResultLayer.clearLayers();

                //for dentist
                for (let eachVenue of dentistResponse.results) {
                    // console.log(eachVenue)
                    let coordinate = [ eachVenue.geocodes.main.latitude, eachVenue.geocodes.main.longitude ];
                    let dentistMarker = L.marker(coordinate);
                    dentistMarker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>`)
                    searchResultLayer.addLayer(marker)
                    dentistMarker.addTo(searchResultLayer); //if we create dentistLayer then it becomes
                    // search result layer? searchresultlayer is the base layer ?
                    //add dentistmarker to dentistlayer

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
                
                //for tcm
                for (let eachVenue of tcmResponse.results) {
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

                //for gp
                for (let eachVenue of gpResponse.results) {
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