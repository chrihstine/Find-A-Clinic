const map = initMap();

async function main() {

    function init() {
       


        //creating layer (dentist)
        let dentistLayer = L.markerClusterGroup({
            iconCreateFunction: function (cluster) {
                return L.divIcon({
                    html: `<div class="dentistMarkerIcon">
            ${cluster.getChildCount()}
            </div>`
                })
            }
        });

        dentistLayer.addTo(map);

        //icon (dentist)
        const dentistIcon = L.icon({
            iconUrl: 'images/dentistIcon.png',
            iconSize: [45, 45],
            iconAnchor: [23, 45],
            popupAnchor: [0, 0]
        })

        //creating layer (tcm)
        let tcmLayer = L.markerClusterGroup({
            iconCreateFunction: function (cluster) {
                return L.divIcon({
                    html: `<div class="tcmMarkerIcon">
            ${cluster.getChildCount()}
            </div>`
                })
            }
        });

        tcmLayer.addTo(map);

        //icon (tcm)
        const tcmIcon = L.icon({
            iconUrl: 'images/tcmIcon.png',
            iconSize: [45, 45],
            iconAnchor: [23, 45],
            popupAnchor: [0, 0]
        })

        //creating layer (gp)
        let gpLayer = L.markerClusterGroup({
            iconCreateFunction: function (cluster) {
                return L.divIcon({
                    html: `<div class="doctorMarkerIcon">
            ${cluster.getChildCount()}
            </div>`
                })
            }
        });

        gpLayer.addTo(map);

        //icon (gp)
        const gpIcon = L.icon({
            iconUrl: 'images/doctorIcon.png',
            iconSize: [45, 45],
            iconAnchor: [23, 45],
            popupAnchor: [0, 0]
        })

        //creating the overlays
        let overlays = {
            "1": dentistLayer,
            "2": tcmLayer,
            "3": gpLayer
        }

        let a = L.control.layers({}, overlays).addTo(map); //dis does not work ):



        // see note 1
        let searchResultLayer = L.layerGroup();
        let resultElement; //= document.createElement('div');
        let searchResultElement; //= document.querySelector('#searchResultElement');
        let numButtonClicks = 0;

        window.addEventListener('DOMContentLoaded', () => {
            let resultElement = document.createElement('div');
            let searchResultElement = document.querySelector('#searchResultElement');
            console.log(resultElement);
            console.log(searchResultElement);
            console.log(resultElement.innerHTML);
            console.log(searchResultElement.innerHTML);


            document.querySelector('#search-btn').addEventListener('click', async () => {
                numButtonClicks++;
                console.log("button clicked!");
                console.log("Number of button clicks " + numButtonClicks);

                console.log(resultElement);
                console.log(searchResultElement);

                if (numButtonClicks > 1) {
                    searchResultElement.innerHTML = "";
                }

                //for i fof results. create element, ap               
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
                    let coordinate = [eachVenue.geocodes.main.latitude, eachVenue.geocodes.main.longitude];
                    let marker = L.marker(coordinate, { icon: dentistIcon });
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>`)
                    dentistLayer.addLayer(marker)
                    marker.addTo(dentistLayer); 

                    // add the search result to #search-results
                    let resultElement = document.createElement('div');
                    let searchResultElement = document.querySelector('#searchResultElement');
                    resultElement.className = "search-result";
                    resultElement.innerHTML = eachVenue.name;
                    console.log(eachVenue.name);
                    resultElement.addEventListener('click', function () {
                        map.flyTo(coordinate, 16);
                        marker.openPopup();
                    })

                    searchResultElement.appendChild(resultElement);
                }

                //for tcm
                for (let eachVenue of tcmResponse.results) {
                    // console.log(eachVenue)
                    let coordinate = [eachVenue.geocodes.main.latitude, eachVenue.geocodes.main.longitude];
                    let marker = L.marker(coordinate, { icon: tcmIcon });
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>`)
                    searchResultLayer.addLayer(marker)
                    marker.addTo(searchResultLayer);

                    // add the search result to #search-results
                    let resultElement = document.createElement('div');
                    let searchResultElement = document.querySelector('#searchResultElement');
                    resultElement.className = "search-result";
                    resultElement.innerHTML = eachVenue.name;

                    resultElement.addEventListener('click', function () {
                        map.flyTo(coordinate, 16);
                        marker.openPopup();
                    })

                    searchResultElement.appendChild(resultElement);
                }

                //for gp
                for (let eachVenue of gpResponse.results) {
                    // console.log(eachVenue)
                    let coordinate = [eachVenue.geocodes.main.latitude, eachVenue.geocodes.main.longitude];
                    let marker = L.marker(coordinate, { icon: gpIcon });
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>`)
                    searchResultLayer.addLayer(marker)
                    marker.addTo(searchResultLayer);

                    // add the search result to #search-results
                    let resultElement = document.createElement('div');
                    let searchResultElement = document.querySelector('#searchResultElement');
                    resultElement.className = "search-result";
                    resultElement.innerHTML = eachVenue.name;

                    resultElement.addEventListener('click', function () {
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