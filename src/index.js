//Challenge 1
function realTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayCurrent = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayCurrent];

  return `${day} ${hours}:${minutes}`;
}

let currentTime = document.querySelector("h2");
let currentDate = new Date();
currentTime.innerHTML = realTime(currentDate);

function displayWeather(response) {
  console.log(response.data);

  let temp = Math.round(response.data.main.temp);
  let currentDegrees = document.querySelector(".degrees");
  currentDegrees.innerHTML = `${temp} °C`;
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector(".wind");
  currentWind.innerHTML = response.data.wind.speed;
}
function search(event) {
  event.preventDefault();
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let city = document.querySelector("#city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
let citySearchForm = document.querySelector("#city-search");
citySearchForm.addEventListener("submit", search);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentWeatherLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-weather");
currentLocationButton.addEventListener("click", showCurrentWeatherLocation);
