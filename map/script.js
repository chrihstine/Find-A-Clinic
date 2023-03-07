const map = initMap();
async function main() {

    function init() {
       


        //creating layer (dentist)
        let dentistLayer = L.markerClusterGroup({
            // iconCreateFunction: function (cluster) {
            //     return L.divIcon({
            //         html: `<div class="markerIcon">
            // ${cluster.getChildCount()}
            // </div>`,
            // className: 'dummy'
            //     })
            // }
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
            // iconCreateFunction: function (cluster) {
            //     return L.divIcon({
            //         html: `<div class="markerIcon">
            // ${cluster.getChildCount()}
            // </div>`,
            // className: 'dummy'
            //     })
            // }
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
            // iconCreateFunction: function (cluster) {
            //     return L.divIcon({
            //         html: `<div class="markerIcon">
            // ${cluster.getChildCount()}
            // </div>`,
            // className: 'dummy'
            //     })
            // }
        });

        gpLayer.addTo(map);

        //icon (gp)
        const gpIcon = L.icon({
            iconUrl: 'images/doctorIcon.png',
            iconSize: [45, 45],
            iconAnchor: [23, 45],
            popupAnchor: [0, 0]
        })

        // // ORIGINAL FILTER SYS. COMMENTED OUT
        // // creating the overlays
        // let overlays = {
        //     "1": dentistLayer,
        //     "2": tcmLayer,
        //     "3": gpLayer
        // }

        // let a = L.control.layers({}, overlays).addTo(map); 


        function layerCheckbox(checkboxName,checkboxId,checkboxLayer, iconId){
            document.querySelector(`input[name=${checkboxName}]`).addEventListener('change', function() {
                if (document.querySelector(`#${checkboxId}`).checked) {
                map.addLayer(checkboxLayer);
                document.querySelector(`#${iconId}`).style.opacity = 1.0;
                } else if (!document.querySelector(`#${checkboxId}`).checked) {
                map.removeLayer(checkboxLayer);
                document.querySelector(`#${iconId}`).style.opacity = 0.5;
                    }
                })
            }
    
    layerCheckbox('dentistCheckbox','dentistCheckbox',dentistLayer,'dentistIcon'); 
    layerCheckbox('tcmCheckbox','tcmCheckbox', tcmLayer,'tcmIcon');
    layerCheckbox('doctorCheckbox','doctorCheckbox', gpLayer,'doctorIcon');


// weather KIV
let weatherLayer = L.layerGroup()
const weatherApi = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast'
let weatherArray = []

async function weather() {
    let response = await axios.get(weatherApi)
    let weatherArea = response.data.area_metadata;

    for (let weather of response.data.items[0].forecasts) {
        weatherArray.push(weather)
    }

    for (let i = 0; i < weatherArray.length; i++) {
        weatherArea[i].forecast = weatherArray[i]
    }

    for (let loc of weatherArea) {
        let lat = loc.label_location.latitude;
        let lng = loc.label_location.longitude;

        if (loc.forecast.forecast == "Cloudy" || loc.forecast.forecast == 'Partly Cloudy (Day)' || loc.forecast.forecast == 'Partly Cloudy (Night)') {

            L.marker([lat, lng], { icon: cloudIcon }).bindPopup(`<div class="weatherLoc" style= " font-family: 'Inconsolata', monospace"><h6> ${loc.name}</h6></div>`).addTo(weatherLayer)
        }

        if (loc.forecast.forecast == "Fair & Warm" || loc.forecast.forecast == 'Fair(Day)' || loc.forecast.forecast == 'Fair(Night)') {
            L.marker([lat, lng], { icon: sunIcon }).bindPopup(`<div class="weatherLoc" style= " font-family: 'Inconsolata', monospace"><h6> ${loc.name}</h6></div>`).addTo(weatherLayer)
        }

        if (loc.forecast.forecast == 'Light Showers' || loc.forecast.forecast == 'Showers' || loc.forecast.forecast == 'Moderate Rain' || loc.forecast.forecast == 'Light Rain') {
            L.marker([lat, lng], { icon: rainIcon }).bindPopup(`<div class="weatherLoc" style= " font-family: 'Inconsolata', monospace"><h6> ${loc.name}</h6></div>`).addTo(weatherLayer)
        }
        if (loc.forecast.forecast == 'Thundery Showers' || loc.forecast.forecast == 'Heavy Thundery Showers' || loc.forecast.forecast == ' Heavy Thundery Showers with Gusty Winds') {
            L.marker([lat, lng], { icon: thunderIcon }).bindPopup(`<div class="weatherLoc" style= " font-family: 'Inconsolata', monospace"><h6> ${loc.name}</h6></div>`).addTo(weatherLayer)
        }
        weatherLayer.addTo(map)
    }

}
//kiv
const cloudIcon = L.icon({
    iconUrl: 'images/cloudIcon.png',
    iconSize: [45, 45],
    iconAnchor: [23, 45],
    popupAnchor: [0, 0]
})

   
        //let searchResultLayer = L.layerGroup();
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

                gpLayer.clearLayers();
                dentistLayer.clearLayers();
                tcmLayer.clearLayers();

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

                //searchResultLayer.clearLayers();

                //for dentist
                for (let eachVenue of dentistResponse.results) {
                    // console.log(eachVenue)
                    let coordinate = [eachVenue.geocodes.main.latitude, eachVenue.geocodes.main.longitude];
                    //let formAdd = eachVenue.location.formatted_address;
                    let marker = L.marker(coordinate, { icon: dentistIcon });
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>
                    <div>${eachVenue.location.formatted_address}</div><div>${eachVenue.location.locality}</div>`
                    )
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
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div><div>${eachVenue.location.formatted_address}</div><div>${eachVenue.location.locality}</div>`)
                    tcmLayer.addLayer(marker)
                    marker.addTo(tcmLayer);

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
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div><div>${eachVenue.location.formatted_address}</div><div>${eachVenue.location.locality}</div>`)
                    gpLayer.addLayer(marker)
                    marker.addTo(gpLayer);

                    // add the search result to #search-results
                    let resultElement = document.createElement('div');
                    let searchResultElement = document.querySelector('#searchResultElement');
                    resultElement.className = "search-result";
                    resultElement.innerHTML = eachVenue.name;

                    resultElement.addEventListener('click', function () {
                        map.flyTo(coordinate, 16);
                        marker.openPopup();
                    })

                    map.flyTo(coordinate, 16);

                    searchResultElement.appendChild(resultElement);
                }



                // display the search result layer if it is not displayed
                // see note 3
                /*if (!map.hasLayer(searchResultLayer)) {
                    map.addLayer(searchResultLayer);
                }*/
            })
        })
    };

    init();
}


main();