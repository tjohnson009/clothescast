import { format } from "date-fns"; 
// const datefns = require('date-fns'); 
// import { format } from "https://unpkg.com/date-fns/format.mjs";
// const datefns = require("date-fns"); 
import setForecastDivs from './forecast.js'; 
import updateClothesCast from './updateClothesCast.js'; 
// const setForecastDivs = require('./forecast.js'); 

class WeatherApp {
  constructor(element) {
    this.element = element;
    this.dataContainer = document.querySelector("#data-container");
    this.cityInput = document.querySelector("#searchField");
    this.searchButton = document.querySelector("#search-button");
    this.measurement = 'imperial' // or 'metric'

    this.element.addEventListener("keydown", (e) => {
      this.handleKeyDown(e);
    });
    this.searchButton.addEventListener("click", (e) => {
      userInterface.clearPreviousData();
      this.getWeather();
    });
  }

  async getWeather() {
    // let cityValue = this.cityInput.value;
    try {
      // console.log(this);
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.cityInput.value}?key=${process.env.API_KEY}`
      );
      // console.log(response);
      if (response.status === 200) {
        let weatherData = await response.json();
        console.log('weather data', weatherData, typeof weatherData);
        userInterface.updateUI(weatherData);
      } else {
        userInterface.dataUnavailable(); 
        throw new Error(await response.json());
      }
    } catch (err) {
      // console.log('LINE 39'); 
      console.error('Error', err);
      // call UI update
      return;
    }
  }

  handleKeyDown(e) {
    if (e.key === "Enter" && this.cityInput.value.length >= 3) {
      userInterface.clearPreviousData();
      this.getWeather();
    } else {
      return;
    }
  }
}

class Converter {
  constructor() {

  }

  // convert c to f

  // convert f to c

  // convert mph to kmh

  // convert kmh to mph

  // convert pressure

  // convert inches to centimeters

  // convert centimeters to inches
}

class UI {
  constructor(app) {
    this.app = app;
    //main divs
    this.cityDiv = document.querySelector(".city-info");
    this.mainInfoDiv = document.querySelector(".main-info");
    this.secondaryInfoDiv = document.querySelector(".secondary-info");
    this.forecastDiv = document.querySelector(".forecast");
    this.searchField = document.querySelector('#searchField'); 

    // children of main divs
    this.cityName = document.querySelector(".city-name");
    this.cityDate = document.querySelector("#city-date");
    this.cityTime = document.querySelector("#city-time");
    this.tempIcon = document.querySelector("#temp-icon");
    this.tempIconDiv = document.querySelector(".temp-icon");
    this.tempNum = document.querySelector(".temp-num");
    this.tempDescriptions = document.querySelector(".temp-descriptions");
    this.shirtDiv = document.querySelector(".shirt");
    this.shortsDiv = document.querySelector(".shorts");
    this.shoesDiv = document.querySelector(".shoes");
    this.umbrellaDiv = document.querySelector(".umbrella");
    this.UVindex = document.querySelector('.uvindex'); 

    // all the lowest level divs where we directly inject content
    this.datapointDivs = Array.from(document.querySelectorAll('.datapoint')); 
  }

  fillSecondaryDatapoints(data) {
    for (let datapoint in data.currentConditions) {
      // if (this.datapointDivs.some(div => div.classList.includes(datapoint))) {
        // }
        // console.log(datapoint); 
        let div = this.datapointDivs.find(div => Array.from(div.classList).includes(datapoint)); 
        if (div) {
          // console.log(div); 
          div.innerHTML = data.currentConditions[datapoint]; 
        }
    }

    for (let datapoint in data) {
        let div = this.datapointDivs.find(div => Array.from(div.classList).includes(datapoint)); 
        if (div) {
          // console.log(div); 
          div.innerHTML = data[datapoint];  
        }
    }

    // UV Index
    this.UVindex.innerHTML = `<img src="../src/icons/weather/line/all/uv-index-${data.currentConditions.uvindex}.svg" class="svg-icon" alt=""></img>`; 
    if (data.currentConditions.uvindex === 0) {
      this.UVindex.innerHTML = 0; 
    }
  }

  updateUI(data) {
    // console.log(this.datapointDivs); 
    this.fillSecondaryDatapoints(data); 
    this.updateMainInfo(data);  
    this.updateTemperatureIcon(data); 
    setForecastDivs(data); 
    updateClothesCast(data); 
    // this.app.dataContainer.insertAdjacentHTML("beforeend",`${data.resolvedAddress.toUpperCase()}: ${JSON.stringify(data.currentConditions.temp)}`);
  }

  dataUnavailable() {
    this.cityName.innerHTML = `Data unavailable for: ${this.searchField.value}`; 
    this.cityName.classList.add('error'); 
  }
  
  updateMainInfo(data) {
    this.cityName.classList.remove('error'); 
    this.searchField.value = data.resolvedAddress; 
    const DATE_MILLISECONDS = data.currentConditions.datetimeEpoch * 1000; 
    const dateOptions = {
      weekday: 'short',    // Mon
      year: 'numeric',     // 2024
      month: 'long',       // August
      day: 'numeric',      // 1st
      timeZone: data.timezone // Specify the desired timezone
    }; 
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: data.timezone,
      timeZoneName: "short",
      hour12: ((data.tzoffset <= -4 && data.tzoffset >= -7) || data.timezone === 'America/Juneau' || data.timezone === 'Pacific/Honolulu' || data.timezone === "America/Adak") ? true : false
    }; 
    // console.log(format(new Date(DATE_MILLISECONDS), "EEE LLLL do, uuu")); 
    // this.cityDate.innerHTML = format(new Date(DATE_MILLISECONDS), "EEE  LLLL do, uuu"); 
    this.cityDate.innerHTML = format(new Intl.DateTimeFormat('en-US', dateOptions).format(new Date()), "EEE LLLL do, uuu"); 
    // this.cityTime.innerHTML = date.datetime;
    this.cityTime.innerHTML = new Intl.DateTimeFormat('en-US', timeOptions).format(Date.now()); 
  }

  updateTemperatureIcon(data) {
    let currentTime = new Date(data.currentConditions.datetimeEpoch * 1000); 
    let currentTimeEpoch = data.currentConditions.datetimeEpoch; 
    // console.log('currentTime', currentTimeEpoch); 
    // if daytime - use daytime icons
    // if (currentTimeEpoch > data.currentConditions.sunriseEpoch || currentTimeEpoch < data.currentConditions.sunsetEpoch) { // daytime
    let imgHTML = `<img id="temp-icon" src="../src/icons/weather/line/all/${data.currentConditions.icon}.svg" class="svg-icon" alt=""></img>`; 
      // console.log(this.tempIcon.src); 
      //nighttime
    // } else {
      // this.tempIcon.src = `../src/icons/weather/line/all/clear-day.svg`; 
    // }
    this.tempIconDiv.insertAdjacentHTML('beforeend', imgHTML); 
  }

  // updateForecastSection(data) {

  // }

  clearPreviousData() {
    this.datapointDivs.forEach(div => {
      div.innerHTML = ''; 
    })

    // clear forcast divs
    this.forecastDiv.innerHTML = ''; 
  }
}

const app = new WeatherApp(document.querySelector("#container"));
const userInterface = new UI(app);
app.cityInput.value = 'Saint Cloud, FL'; 
app.getWeather(); 
// userInterface.updateMainInfo(app.getWeather()); 
// userInterface.updateMainInfo(); 
