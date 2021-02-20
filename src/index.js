let now = new Date();

function getTimeDay(currentDate) {
  let hours = now.getHours();

  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let today = days[day];

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${today} ${hours}:${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  let city = searchInput.value;
  let forecastToday = document.querySelector("#Today");
  forecastToday.innerHTML = city;
  let apiKey = "8e1200888b2b1e98ddd0437072d3d7cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let h2 = document.querySelector("h2");
h2.innerHTML = getTimeDay(now);

let form = document.querySelector("#form_City");
form.addEventListener("submit", searchCity);

function findCurrentLocation(position) {
  console.log(position);
}

function findPosition(position) {
  console.log(position);
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;

  let apiKey = "d57548feb68ff97f5b47ea4b49ae289d";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function showWeather(response) {
  console.log(response.data.name);
  console.log(response.data.main.temp);
  let city = document.querySelector("#Today");
  city.innerHTML = response.data.name;
  let forecastToday = document.querySelector("#forecastToday");
  forecastToday.innerHTML = `It is ${response.data.main.temp}°C`;
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

let currentCity = document.querySelector(".getCurrent");
currentCity.addEventListener("click", getCurrentCity);
