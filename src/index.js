//display day "last updated"
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
//Searching for a city + displaying weather information of that city
function displayTemperature(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  let cityElement = document.querySelector("#searched-city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#current-wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);

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

//display Forecast
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `  
  <div class="col-2">
    <h3 class="forecast-time">${formatHours(forecast.dt * 1000)}</h3>
      <div class="weatherForecast-Temp">
<strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(
      forecast.main.temp_min
    )}°
    </div>
    <img class="forecast-img"src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" width=64px
    />
  </div>`;
  }
}

function search(city) {
  if (city) {
    let searchedCity = document.querySelector("#searched-city");
    searchedCity.innerHTML = city;
    let apiKey = "3aacdf70afc33650631ca99d10ae4afe";
    let units = "metric";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.innerHTML}&units=${units}`;
    axios.get(`${apiURL}&appid=${apiKey}`).then(displayTemperature);

    //forecast
    apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity.innerHTML}&units=${units}&appid=${apiKey}`;
    axios.get(apiURL).then(displayForecast);
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
search("Honolulu");
