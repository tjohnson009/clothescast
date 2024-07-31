import { format } from "date-fns"; 
// const datefns = require('date-fns'); 
// import { format } from "https://unpkg.com/date-fns/format.mjs";
// const datefns = require("date-fns"); 
import setForecastDivs from './forecast.js'; 
// const setForecastDivs = require('./forecast.js'); 

class WeatherApp {
  constructor(element) {
    this.element = element;
    this.dataContainer = document.querySelector("#data-container");
    this.cityInput = document.querySelector("#searchField");
    this.searchButton = document.querySelector("#search-button");


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
      console.log(this);
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.cityInput.value}?key=${process.env.API_KEY}`
      );
      console.log(response);
      if (response.status === 200) {
        let weatherData = await response.json();
        console.log('weather data', weatherData, typeof weatherData);
        userInterface.updateUI(weatherData);
      } else {
        // throw new Error(await response.json());
      }
    } catch (err) {
      // console.log('LINE 39'); 
      console.log('Error', err);
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
    this.tempIcon = document.querySelector(".temp-icon");
    this.tempNum = document.querySelector(".temp-num");
    this.tempDescriptions = document.querySelector(".temp-descriptions");
    this.shirtDiv = document.querySelector(".shirt");
    this.shortsDiv = document.querySelector(".shorts");
    this.shoesDiv = document.querySelector(".shoes");
    this.umbrellaDiv = document.querySelector(".umbrella");

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
  }

  updateUI(data) {
    // console.log(this.datapointDivs); 
    this.updateClothesCast(data); 
    this.fillSecondaryDatapoints(data); 
    this.updateMainInfo(data); 
    setForecastDivs(data); 
    // this.app.dataContainer.insertAdjacentHTML("beforeend",`${data.resolvedAddress.toUpperCase()}: ${JSON.stringify(data.currentConditions.temp)}`);
  }
  
  updateMainInfo(data) {
    this.searchField.value = data.resolvedAddress; 
    const DATE_MILLISECONDS = data.currentConditions.datetimeEpoch * 1000; 
    const options = {
      weekday: 'short',    // EEE
      year: 'numeric',     // uuuu
      month: 'long',       // LLLL
      day: 'numeric',      // do
      hour12: `${data.tzoffset < -4 && data.tzoffset > -10 ? true : false}`, 
      timeZone: data.timezone // Specify the desired timezone
    }
    console.log(format(new Date(DATE_MILLISECONDS), "EEE  LLLL do, uuu")); 
    // this.cityDate.innerHTML = format(new Date(DATE_MILLISECONDS), "EEE  LLLL do, uuu"); 
    this.cityDate.innerHTML = format(new Intl.DateTimeFormat('en-US', options).format(new Date()), "EEE  LLLL do, uuu"); 
    this.cityTime.innerHTML = new Date(data.currentConditions.datetimeEpoch * 1000); 
  }

  updateClothesCast(data) {

  }

  clearPreviousData() {
    this.datapointDivs.forEach(div => {
      div.innerHTML = ''; 
    })
  }
}

const app = new WeatherApp(document.querySelector("#container"));
const userInterface = new UI(app);
app.cityInput.value = 'Saint Cloud, FL'; 
app.getWeather(); 
// userInterface.updateMainInfo(app.getWeather()); 
// userInterface.updateMainInfo(); 
