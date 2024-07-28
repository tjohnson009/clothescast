/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// const dotenv = require('dotenv');\n// dotenv.config();\n// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY\n// const dataElement = document.querySelector('#data');\n// const cityInput = document.querySelector('#searchbar');\n// const searchButton = document.querySelector('#search');\n\n// async function getWeather() {\n//     let cityValue = cityInput.value;\n//     console.log(process.env);\n//     const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityValue}?key=${process.env.API_KEY}`);\n//     let weatherData = await response.json();\n//     console.log(weatherData, typeof weatherData);\n//     dataElement.insertAdjacentHTML('beforeend', `${weatherData.resolvedAddress.toUpperCase()}: ${JSON.stringify(weatherData.currentConditions.temp)}`);\n// }\n\n// function clearCityData() {\n//     dataElement.innerHTML = '';\n// }\n\n// getWeather();\n// searchButton.addEventListener('click', (e) => {\n//     clearCityData();\n//     getWeather();\n// })\n\n// window.addEventListener('keydown', (e) => {\n//     // console.log(e)\n// })\n\nclass WeatherApp {\n  constructor(element) {\n    this.element = element;\n    this.dataContainer = document.querySelector(\"#data-container\");\n    this.cityInput = document.querySelector(\"#searchField\");\n    this.searchButton = document.querySelector(\"#search-button\");\n\n\n    this.element.addEventListener(\"keydown\", (e) => {\n      this.handleKeyDown(e);\n    });\n    this.searchButton.addEventListener(\"click\", (e) => {\n      userInterface.clearPreviousData();\n      this.getWeather();\n    });\n  }\n\n  async getWeather() {\n    // let cityValue = this.cityInput.value;\n    try {\n      console.log(this);\n      const response = await fetch(\n        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.cityInput.value}?key=${\"ZSDFHZX585XMCF2B2ZAKNW4CH\"}`\n      );\n      console.log(response);\n      if (response.status === 200) {\n        let weatherData = await response.json();\n        console.log(weatherData, typeof weatherData);\n        userInterface.updateUI(weatherData);\n      } else {\n        throw new Error(await response.json());\n      }\n    } catch (err) {\n      console.log(err);\n      // call UI update\n      return;\n    }\n  }\n\n  handleKeyDown(e) {\n    if (e.key === \"Enter\" && this.cityInput.value.length >= 3) {\n      userInterface.clearPreviousData();\n      this.getWeather();\n    } else {\n      return;\n    }\n  }\n}\n\nclass Converter {\n  constructor() {\n\n  }\n\n  // convert c to f\n\n  // convert f to c\n\n  // convert mph to kmh\n\n  // convert kmh to mph\n\n  // convert pressure\n\n  // convert inches to centimeters\n\n  // convert centimeters to inches\n}\n\nclass UI {\n  constructor(app) {\n    this.app = app;\n    //main divs\n    this.cityDiv = document.querySelector(\".city-info\");\n    this.mainInfoDiv = document.querySelector(\".main-info\");\n    this.secondaryInfoDiv = document.querySelector(\".secondary-info\");\n    this.forecastDiv = document.querySelector(\".forecast\");\n    this.searchField = document.querySelector('#searchField'); \n\n    // children of main divs\n    this.cityName = document.querySelector(\".city-name\");\n    this.cityDate = document.querySelector(\".city-date\");\n    this.tempIcon = document.querySelector(\".temp-icon\");\n    this.tempNum = document.querySelector(\".temp-num\");\n    this.tempDescriptions = document.querySelector(\".temp-descriptions\");\n    this.shirtDiv = document.querySelector(\".shirt\");\n    this.shortsDiv = document.querySelector(\".shorts\");\n    this.shoesDiv = document.querySelector(\".shoes\");\n    this.umbrellaDiv = document.querySelector(\".umbrella\");\n\n    // all the lowest level divs where we directly inject content\n    this.datapointDivs = Array.from(document.querySelectorAll('.datapoint')); \n  }\n\n  updateSecondaryWeatherInfo() {\n\n  }\n\n  fillDatapoints(data) {\n    for (let datapoint in data.currentConditions) {\n      // if (this.datapointDivs.some(div => div.classList.includes(datapoint))) {\n        // }\n        // console.log(datapoint); \n        let div = this.datapointDivs.find(div => Array.from(div.classList).includes(datapoint)); \n        if (div) {\n          // console.log(div); \n          div.innerHTML = data.currentConditions[datapoint]; \n        }\n    }\n\n    for (let datapoint in data) {\n        let div = this.datapointDivs.find(div => Array.from(div.classList).includes(datapoint)); \n        if (div) {\n          // console.log(div); \n          div.innerHTML = data[datapoint];  \n        }\n    }\n  }\n\n  updateUI(data) {\n    // console.log(this.datapointDivs); \n    this.fillDatapoints(data); \n    // this.app.dataContainer.insertAdjacentHTML(\"beforeend\",`${data.resolvedAddress.toUpperCase()}: ${JSON.stringify(data.currentConditions.temp)}`);\n    this.searchField.value = data.resolvedAddress; \n  }\n\n  clearPreviousData() {\n    this.datapointDivs.forEach(div => {\n      div.innerHTML = ''; \n    })\n  }\n}\n\nconst app = new WeatherApp(document.querySelector(\"#container\"));\nconst userInterface = new UI(app);\napp.cityInput.value = 'Saint Cloud, FL'; \napp.getWeather(); \n\n\n//# sourceURL=webpack://template-repository/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;