let currentTime = document.querySelector("#current-time");
let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentTime.innerHTML = `${hour}:${minutes}`;

let currentDay = document.querySelector("#current-day");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentDay.innerHTML = `${day}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastDaily = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row" id="nextDays">`;
  forecastDaily.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3 forecastDate">
          ${formatDay(forecastDay.dt)}
          <br />
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          id="forecastIcon">
          <br />
          <span class="temp-max">${forecastDay.temp.max}° | </span>
          <span class="temp-min">${forecastDay.temp.min}°</span>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7837f66493d567007e68c9221e2ef6ed";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#actual-city").innerHTML = response.data.name;
  document.querySelector("#actualTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celciusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "7837f66493d567007e68c9221e2ef6ed";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function submitInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "7837f66493d567007e68c9221e2ef6ed";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function currentStandort(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#actualTemp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#actualTemp");
  tempElement.innerHTML = Math.round(celciusTemp);
}

let cityInput = document.querySelector("#search");
cityInput.addEventListener("submit", submitInput);

let currentLocation = document.querySelector("#currentBtn");
currentLocation.addEventListener("click", currentStandort);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);

let celciusTemp = null;

searchCity("New York");
