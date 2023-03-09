const API_BASE_URL="https://api.foursquare.com/v3";
const API_KEY="fsq36vWuvzc4ASQhuuv+TktgLmcCAI4WKFykx0ewzgChlkQ="
const headers = {
    Accept: 'application/json',
    Authorization: API_KEY    
}

async function search(lat, lng, query, category) {
    // create the coordinate
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "/places/search",{
        headers: {
            ...headers
        },
        params: {
            'll': ll,
            'v': '20210903',  // YYYYMMDD format
            'query': query, 
            'categories': String(category),
        }
    })
    return response.data;
}