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

let cityInput = document.querySelector("#search");
cityInput.addEventListener("submit", submitInput);

let currentLocation = document.querySelector("#currentBtn");
currentLocation.addEventListener("click", currentStandort);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#actualTemp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celciusTemp = null;

searchCity("New York");
