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
  convertToFahrenhheit(celsius) {
    return ((celsius* (9/5)) + 32); 
  }
  // convert f to c
  convertToC(fahrenheit) {
    return ((fahrenheit - 32) * (5/9)); 
  }

  // convert mph to kmh
  convertToKM(milesOrMPH) {
    return (milesOrMPH * 1.609344); 
  }
  // convert kmh to mph
  convertToMiles(kmOrKMH) {
    return (kmOrKMH * .621371); 
  }

  // convert inches to centimeters
  convertToCM(inches) {
    return (inches * 2.54);
  }

  // convert centimeters to inches
  convertToInches(cm) {
    return (cm * .393701);
  }
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
    this.metricButton = document.querySelector('.settings-metric'); 
    this.imperialButton = document.querySelector('.settings-imperial'); 

    [this.metricButton, this.imperialButton].forEach(button => {
      button.addEventListener('click', (e) => {
        this.switchSettings(); 
      })
    })

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
    this.moonDiv = document.querySelector('.moonphase'); 

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

    // Moon
    let moonPhase = data.currentConditions.moonphase;

    if (moonPhase === 0) {
      // New moon
      this.moonDiv.innerHTML = `<img src="../src/icons/weather/line/all/moon-new.svg" class="svg-icon" alt="New Moon"></img>`;
    } else if (moonPhase > 0 && moonPhase < 0.25) {
      // Waxing crescent
      this.moonDiv.innerHTML = `<img src="../src/icons/weather/line/all/moon-waxing-crescent.svg" class="svg-icon" alt="Waxing Crescent"></img>`;
    } else if (moonPhase === 0.25) {
      // First quarter
      this.moonDiv.innerHTML = `<img src="../src/icons/weather/line/all/moon-first-quarter.svg" class="svg-icon" alt="First Quarter"></img>`;
    } else if (moonPhase > 0.25 && moonPhase < 0.5) {
      // Waxing gibbous
      this.moonDiv.innerHTML = `<img src="../src/icons/weather/line/all/moon-waxing-gibbous.svg" class="svg-icon" alt="Waxing Gibbous"></img>`;
    } else if (moonPhase === 0.5) {
      // Full moon
      this.moonDiv.innerHTML = `<img src="../src/icons/weather/line/all/moon-full.svg" class="svg-icon" alt="Full Moon"></img>`;
    } else if (moonPhase > 0.5 && moonPhase < 0.75) {
      // Waning gibbous
      this.moonDiv.innerHTML = `<img src="../src/icons/weather/line/all/moon-waning-gibbous.svg" class="svg-icon" alt="Waning Gibbous"></img>`;
    } else if (moonPhase === 0.75) {
      // Last quarter
      this.moonDiv.innerHTML = `<img src="../src/icons/weather/line/all/moon-last-quarter.svg" class="svg-icon" alt="Last Quarter"></img>`;
    } else if (moonPhase > 0.75 && moonPhase < 1) {
      // Waning crescent
      this.moonDiv.innerHTML = `<img src="../src/icons/weather/line/all/moon-waning-crescent.svg" class="svg-icon" alt="Waning Crescent"></img>`;
    } else {
      // Default full moon
      this.moonDiv.innerHTML = `<img src="../src/icons/weather/line/all/moon-full.svg" class="svg-icon" alt="Default Full Moon"></img>`;
    }
    
    // Wind


  }

  switchSettings() {
    let active = document.querySelector('.active'); 

    if (active === this.metricButton) { //switch to imperial
      let allMetrics = Array.from(document.querySelectorAll('.metric')); 
      let tempMeasurements = Array.from(document.querySelectorAll('.temperature-measurement'));

      tempMeasurements.forEach(el => {
        el.innerHTML = '&#8457;'
      }); 

      allMetrics.forEach(el => {
        if (el.classList.includes('distance')) {
          el.innerHTML = 'mi'; 
        }

        if (el.classList.includes('speed')) {
          el.innerHTML = 'mph'; 
        }

        // to convert numbers, it has to have datapoint class and one of the above 2 metrics

      }); 
    } else if (active === this.imperialButton) {

    }
  }

  updateUI(data) {
    // console.log(this.datapointDivs); 
    this.fillSecondaryDatapoints(data); 
    this.updateMainInfo(data);  
    this.updateTemperatureIcon(data); 
    setForecastDivs(data, this.app); 
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
const converter = new Converter(); 
app.cityInput.value = 'Saint Cloud, FL'; 
app.getWeather(); 
// userInterface.updateMainInfo(app.getWeather()); 
// userInterface.updateMainInfo(); 
