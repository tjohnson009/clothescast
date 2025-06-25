import { format } from "date-fns"; 
// const datefns = require('date-fns'); 
// import { format } from "https://unpkg.com/date-fns/format.mjs";
// const datefns = require("date-fns"); 
import './styles.css'; 
import setForecastDivs from './forecast.js'; 
import updateClothesCast from './updateClothesCast.js'; 
import setWindDirections from "./winddirections.js";
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
      console.log(this);
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.cityInput.value}?key=${process.env.API_KEY}`
      );

      // set all settings to imperial
      userInterface.metricButton.classList.remove('active'); 
      userInterface.imperialButton.classList.add('active'); 
      this.measurement = 'imperial';

      let allMetrics = Array.from(document.querySelectorAll('.metric')); 
      let tempMeasurements = Array.from(document.querySelectorAll('.temperature-measurement')); 
      tempMeasurements.forEach(el => {
        el.innerHTML = '&#8457;'  // &#8451; celsius
        el.classList.remove('metric'); 
        el.classList.add('imperial'); 
      }); 
      allMetrics.forEach(el => {
        if (el.classList.contains('distance-unit-big')) {
          el.innerHTML = ' mi'; 
          el.classList.remove('metric'); 
          el.classList.add('imperial'); 
        }
        if (el.classList.contains('distance-unit-small')) {
          el.innerHTML = ' in'; 
          el.classList.remove('metric'); 
          el.classList.add('imperial'); 
        }
        if (el.classList.contains('speed')) {
          el.innerHTML = 'mph'; 
          el.classList.remove('metric'); 
          el.classList.add('imperial'); 
        }
      }); 

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

  // convert miles to km
  convertToKM(milesOrMPH) {
    return (milesOrMPH * 1.609344); 
  }
  // convert km to miles
  convertToMiles(kmOrKMH) {
    return (kmOrKMH * .621371); 
  }

  convertToKM(milesOrMPH) {
    return (milesOrMPH * 1.609344); 
  }
  // convert km to miles
  convertToMiles(kmOrKMH) {
    return (kmOrKMH * .621371); 
  }

  // convert inches to millimeters
  convertToCM(inches) {
    return (inches * 2.54);
  }

  // convert millimeters to inches
  // convertToInches(mm) {
  //   return (mm * .0393701);
  // }
  convertToInches(mm) {
    return (mm * .0393701);
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
        console.log(e.target); 
        this.switchSettings(e); 
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
        // console.log(data.days[0]); 
        if (div) {
          // console.log(div); 
          div.innerHTML = data[datapoint];  
        }
      }

      let tempmax = document.querySelector('.tempmax'); 
      let tempmin = document.querySelector('.tempmin'); 
      tempmax.innerHTML = data.days[0].tempmax;
      tempmin.innerHTML = data.days[0].tempmin;

      if (parseInt(data.currentConditions.snowdepth)) {
        const snowMetrics = Array.from(document.querySelectorAll('.conditional')); 
        snowMetrics.forEach(metric => {
          metric.classList.remove('hidden'); 
          metric.classList.add('secondary'); 
        })
      } else {
        const snowMetrics = Array.from(document.querySelectorAll('.conditional')); 
        snowMetrics.forEach(metric => {
          metric.classList.remove('secondary'); 
          metric.classList.add('hidden'); 
        })
      }

    //   for (let datapoint in data['days'][0]) {
    //       let div = this.datapointDivs.find(div => Array.from(div.classList).includes(datapoint)); 
    //       if (div) { 
    //         div.innerHTML = data[datapoint];  
    //       } 
    // }
  


    // UV Index
    this.UVindex.innerHTML = `<img src="icons/weather/line/all/uv-index-${data.currentConditions.uvindex}.svg" class="svg-icon" alt=""></img>`; 
    if (data.currentConditions.uvindex === 0) {
      this.UVindex.innerHTML = 0; 
    }

    // Moon
    let moonPhase = data.currentConditions.moonphase;

    if (moonPhase === 0) {
      // New moon
      this.moonDiv.innerHTML = `<img src="icons/weather/line/all/moon-new.svg" class="svg-icon" alt="New Moon"></img>`;
    } else if (moonPhase > 0 && moonPhase < 0.25) {
      // Waxing crescent
      this.moonDiv.innerHTML = `<img src="icons/weather/line/all/moon-waxing-crescent.svg" class="svg-icon" alt="Waxing Crescent"></img>`;
    } else if (moonPhase === 0.25) {
      // First quarter
      this.moonDiv.innerHTML = `<img src="icons/weather/line/all/moon-first-quarter.svg" class="svg-icon" alt="First Quarter"></img>`;
    } else if (moonPhase > 0.25 && moonPhase < 0.5) {
      // Waxing gibbous
      this.moonDiv.innerHTML = `<img src="icons/weather/line/all/moon-waxing-gibbous.svg" class="svg-icon" alt="Waxing Gibbous"></img>`;
    } else if (moonPhase === 0.5) {
      // Full moon
      this.moonDiv.innerHTML = `<img src="icons/weather/line/all/moon-full.svg" class="svg-icon" alt="Full Moon"></img>`;
    } else if (moonPhase > 0.5 && moonPhase < 0.75) {
      // Waning gibbous
      this.moonDiv.innerHTML = `<img src="icons/weather/line/all/moon-waning-gibbous.svg" class="svg-icon" alt="Waning Gibbous"></img>`;
    } else if (moonPhase === 0.75) {
      // Last quarter
      this.moonDiv.innerHTML = `<img src="icons/weather/line/all/moon-last-quarter.svg" class="svg-icon" alt="Last Quarter"></img>`;
    } else if (moonPhase > 0.75 && moonPhase < 1) {
      // Waning crescent
      this.moonDiv.innerHTML = `<img src="icons/weather/line/all/moon-waning-crescent.svg" class="svg-icon" alt="Waning Crescent"></img>`;
    } else {
      // Default full moon
      this.moonDiv.innerHTML = `<img src="icons/weather/line/all/moon-full.svg" class="svg-icon" alt="Default Full Moon"></img>`;
    }
    
    // Wind


  }

  switchSettings(e) {
    console.log(this); 
    let activeSetting = document.querySelector('.active'); 
    let tempMeasurements = Array.from(document.querySelectorAll('.temperature-measurement'));
    
      //this.app.measurement === 'metric'
    if (activeSetting === this.metricButton && e.target.classList.contains('settings-imperial')) { //switch to imperial
      let allMetrics = Array.from(document.querySelectorAll('.metric')); 

      tempMeasurements.forEach(el => {
        el.innerHTML = '&#8457;'  // &#8451; celsius
        el.classList.remove('metric'); 
        el.classList.add('imperial'); 
      }); 

      allMetrics.forEach(el => {
        if (el.classList.contains('distance-unit-big')) {
          el.innerHTML = ' mi'; 
          el.classList.remove('metric'); 
          el.classList.add('imperial'); 
        }

        if (el.classList.contains('distance-unit-small')) {
          el.innerHTML = ' in'; 
          el.classList.remove('metric'); 
          el.classList.add('imperial'); 
        }

        if (el.classList.contains('speed')) {
          el.innerHTML = 'mph'; 
          el.classList.remove('metric'); 
          el.classList.add('imperial'); 
        }
      }); 

        // to convert numbers, it has to have datapoint class and one of the above 2 metrics
        // this.datapointDivs.forEach(div => {
        //   if (div.classList.contains('distance-number-big')) {
        //     let current = parseInt(div.innerHTML); 
        //     div.innerHTML = converter.convertToMiles(current).toFixed(1); 
        //   } else if (div.classList.contains('speed')) {
        //     let current = parseInt(div.innerHTML); 
        //     div.innerHTML = converter.convertToMiles(current).toFixed(1);
        //   } else if (div.classList.contains('temperature-number')) {
        //     let current = parseInt(div.innerHTML);
        //     div.innerHTML = converter.convertToFahrenhheit(current).toFixed(1); 
        //   }
        // }); 
        
        this.clearPreviousData(); 
        this.app.getWeather().then(() => {
          console.log('Getting fresh weather data...'); 
          
          
          // confirm changes 
          this.metricButton.classList.remove('active'); 
          this.imperialButton.classList.add('active'); 
          this.app.measurement = 'imperial'; 
        }); 
    } else if (activeSetting === this.imperialButton && e.target.classList.contains('settings-metric')) { // switchh to metric
      let allImperials = Array.from(document.querySelectorAll('.imperial')); 

      tempMeasurements.forEach(el => {
        el.innerHTML = '&#8451;'; 
        el.classList.add('metric'); 
        el.classList.remove('imperial'); 
      }); 

      allImperials.forEach(el => {
        if (el.classList.contains('distance-unit-big')) {
          el.innerHTML = ' km'; 
          el.classList.add('metric'); 
          el.classList.remove('imperial'); 
        }

        if (el.classList.contains('distance-unit-small')) {
          el.innerHTML = ' cm'; 
          el.classList.add('metric'); 
          el.classList.remove('imperial'); 
        }

        if (el.classList.contains('speed')) {
          el.innerHTML = 'km/h'; 
          el.classList.add('metric'); 
          el.classList.remove('imperial'); 
        }
      }); 

        // to convert numbers, it has to have datapoint class and one of the above 2 metrics
        let datapoints = Array.from(document.querySelectorAll('.datapoint')); 
        datapoints.forEach(div => {
          if (div.classList.contains('distance-number-big')) {
            let current = parseInt(div.innerHTML); 
            div.innerHTML = converter.convertToKM(current).toFixed(1); 
          } else if (div.classList.contains('speed')) {
            let current = parseInt(div.innerHTML); 
            div.innerHTML = converter.convertToKM(current).toFixed(1);
          } else if (div.classList.contains('distance-number-small')) {
            let current = parseInt(div.innerHTML); 
            div.innerHTML = converter.convertToCM(current).toFixed(1); 
          } else if (div.classList.contains('temperature-number')) {
            let current = parseInt(div.innerHTML);
            if (!div.classList.contains('day-high') && !div.classList.contains('day-low')) {
              div.innerHTML = converter.convertToC(current).toFixed(1); 
            } else {
              div.innerHTML = converter.convertToC(current).toFixed(0);
            }
          }
        }); 

          // confirm changes 
          this.metricButton.classList.add('active'); 
          this.imperialButton.classList.remove('active'); 
          this.app.measurement = 'metric'; 
    } 
    // else {
    //   this.dataUnavailable(); 
    //   this.cityName.innerHTML = `Something went wrong. Search for weather data again.`;
    // }
  }

   updateUI(data) {
    // try {
      // console.log(this.datapointDivs); 
      this.fillSecondaryDatapoints(data); 
      this.updateMainInfo(data);  
      this.updateTemperatureIcon(data); 
      setForecastDivs(data, this.app); 
      updateClothesCast(data); 
      setWindDirections(); 
    // } catch(err) {
    //   console.error(`Error updating UI: ${err}`); 
    // }
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
    let imgHTML = `<img id="temp-icon" src="icons/weather/line/all/${data.currentConditions.icon}.svg" class="svg-icon" alt=""></img>`; 
      // console.log(this.tempIcon.src); 
      //nighttime
    // } else {
      // this.tempIcon.src = `icons/weather/line/all/clear-day.svg`; 
    // }
    this.tempIconDiv.insertAdjacentHTML('beforeend', imgHTML); 
  }

  clearPreviousData() {
    this.datapointDivs.forEach(div => {
      div.innerHTML = ''; 
    })

    // clear forcast divs
    // this.forecastDiv.innerHTML = ''; 
    let days = Array.from(document.querySelectorAll('.day')); 
    days.forEach(el => {
      el.remove(); 
    })
  }
}

const app = new WeatherApp(document.querySelector("#container"));
const userInterface = new UI(app);
const converter = new Converter(); 
app.cityInput.value = 'Saint Cloud, FL'; 
app.getWeather(); 
// userInterface.updateMainInfo(app.getWeather()); 
// userInterface.updateMainInfo(); 
