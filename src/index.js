// const dotenv = require('dotenv');
// dotenv.config();
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY
// const dataElement = document.querySelector('#data');
// const cityInput = document.querySelector('#searchbar');
// const searchButton = document.querySelector('#search');

// async function getWeather() {
//     let cityValue = cityInput.value;
//     console.log(process.env);
//     const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityValue}?key=${process.env.API_KEY}`);
//     let weatherData = await response.json();
//     console.log(weatherData, typeof weatherData);
//     dataElement.insertAdjacentHTML('beforeend', `${weatherData.resolvedAddress.toUpperCase()}: ${JSON.stringify(weatherData.currentConditions.temp)}`);
// }

// function clearCityData() {
//     dataElement.innerHTML = '';
// }

// getWeather();
// searchButton.addEventListener('click', (e) => {
//     clearCityData();
//     getWeather();
// })

// window.addEventListener('keydown', (e) => {
//     // console.log(e)
// })

class WeatherApp {
  constructor(element) {
    this.element = element;
    this.dataElement = document.querySelector("#data");
    this.cityInput = document.querySelector("#searchField");
    this.searchButton = document.querySelector("#search-button");
    this.cityDiv = document.querySelector(".city-info");
    this.mainInfoDiv = document.querySelector(".main-info");
    this.secondaryInfoDiv = document.querySelector(".secondary-info");
    this.forecastDiv = document.querySelector(".forecast");

    this.element.addEventListener("keydown", (e) => {
      this.handleKeyDown(e);
    });
    this.searchButton.addEventListener("click", (e) => {
      userInterface.clearCityData();
      this.getWeather();
    });
  }

  async getWeather() {
    // let cityValue = this.cityInput.value;
    try {
      console.log(this);
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.cityInput.value}?key=${process.env.API_KEY}`
      );
      console.log(response);
      if (response.status === 200) {
        let weatherData = await response.json();
        console.log(weatherData, typeof weatherData);
        userInterface.updateUI(weatherData);
      } else {
        throw new Error(await response.json());
      }
    } catch (err) {
      console.log(err);
      // call UI update
      return;
    }
  }

  handleKeyDown(e) {
    if (e.key === "Enter" && this.cityInput.value.length >= 3) {
      userInterface.clearCityData();
      this.getWeather();
    } else {
      return;
    }
  }
}

class UI {
  constructor(app) {
    this.app = app;
  }

  updateUI(data) {
    this.app.dataElement.insertAdjacentHTML("beforeend",`${data.resolvedAddress.toUpperCase()}: ${JSON.stringify(data.currentConditions.temp)}`);
  }

  clearCityData() {
    this.app.dataElement.innerHTML = "";
  }
}

const app = new WeatherApp(document.querySelector("#container"));
const userInterface = new UI(app);
