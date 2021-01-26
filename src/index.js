function formatTime(timestamp) {
  let date = new Date(timestamp);
  let thisDate = date.getDate();
  let year = date.getFullYear();
  let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  return `${day} ${thisDate}.${month}.${year} at ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  celsiusTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  let cityElement = document.querySelector("#searched-city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#current-wind-speed");
  windElement.innerHTML = response.data.wind.speed;

  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let feltTempElement = document.querySelector("#felt-temp");
  feltTempElement.innerHTML = Math.round(response.data.main.feels_like);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatTime(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
}

//let Key = "3aacdf70afc33650631ca99d10ae4afe";
//let units = "metric";
//let city = "London";

//let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=metric`;
//console.log(apiURL);
//axios.get(apiURL).then(displayTemperature);

//Searching for a city
function search(city) {
  if (city) {
    let searchedCity = document.querySelector("#searched-city");
    searchedCity.innerHTML = city;
    let apiKey = "3aacdf70afc33650631ca99d10ae4afe";
    let units = "metric";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.innerHTML}&units=${units}`;
    axios.get(`${apiURL}&appid=${apiKey}`).then(displayTemperature);
  } else {
    searchedCity.innerHTML = null;
    alert("Please type a city or click the current Location button");
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");

  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//unit conversion
function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let currentFahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let TempinFahrenheit = document.querySelector("#current-temperature");
  TempinFahrenheit.innerHTML = currentFahrenheitTemp;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitlink.classList.remove("active");
  celsiuslink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = celsiusTemp;
}

let celsiusTemp = null;
let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemp);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemp);

//Default City
search("New York");
