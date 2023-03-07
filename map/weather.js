const BASE_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const WEATHER_APIKEY = "e4125169de7d23c9b5f29804526aad3c";


async function weather(lat, lon) {
  let response = await axios.get(
    BASE_WEATHER_API_URL +
      `lat=${lat}&lon=${lon}&appid=${WEATHER_APIKEY}`
  );

  return response.data;
}
