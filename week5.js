function updateTime() {
  let current = new Date();
  let currentTime = document.querySelector("#time");
  let date = current.getDate();
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[current.getDay()];
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentTime.innerHTML = `${day}
  ${hours}: ${minutes}`;
}
updateTime();

function showCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperatureUnit").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function citySearch(city) {
  let apiKey = `aeaf3bb5f824a5e7c289e55071fe2a1b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCityName").value;
  citySearch(city);
}

let form = document.querySelector("#form-id");
form.addEventListener("submit", handleSubmit);
function searchCurrentLocation(position) {
  let apiKey = `aeaf3bb5f824a5e7c289e55071fe2a1b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let current = document.querySelector("#current");
current.addEventListener("click", displayCurrentWeather);
citySearch("Canada");