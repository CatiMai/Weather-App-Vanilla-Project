function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#current-wind-speed");
  windElement.innerHTML = response.data.wind.speed;

  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let feltTempElement = document.querySelector("#felt-temp");
  feltTempElement.innerHTML = Math.round(response.data.main.feels_like);
}

let Key = "3aacdf70afc33650631ca99d10ae4afe";
let units = "metric";
let city = "London";

let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=metric`;
console.log(apiURL);
axios.get(apiURL).then(displayTemperature);
