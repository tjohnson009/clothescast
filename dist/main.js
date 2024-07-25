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

eval("// const dotenv = require('dotenv');\n// dotenv.config();\n// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY\n// const dataElement = document.querySelector('#data');\n// const cityInput = document.querySelector('#searchbar');\n// const searchButton = document.querySelector('#search');\n\n// async function getWeather() {\n//     let cityValue = cityInput.value;\n//     console.log(process.env);\n//     const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityValue}?key=${process.env.API_KEY}`);\n//     let weatherData = await response.json();\n//     console.log(weatherData, typeof weatherData);\n//     dataElement.insertAdjacentHTML('beforeend', `${weatherData.resolvedAddress.toUpperCase()}: ${JSON.stringify(weatherData.currentConditions.temp)}`);\n// }\n\n// function clearCityData() {\n//     dataElement.innerHTML = '';\n// }\n\n// getWeather();\n// searchButton.addEventListener('click', (e) => {\n//     clearCityData();\n//     getWeather();\n// })\n\n// window.addEventListener('keydown', (e) => {\n//     // console.log(e)\n// })\n\nclass WeatherApp {\n  constructor(element) {\n    this.element = element;\n    this.dataElement = document.querySelector(\"#data\");\n    this.cityInput = document.querySelector(\"#searchbar\");\n    this.searchButton = document.querySelector(\"#search\");\n\n    this.element.addEventListener(\"keydown\", (e) => {\n      this.handleKeyDown(e);\n    });\n    this.searchButton.addEventListener(\"click\", (e) => {\n      this.clearCityData();\n      this.getWeather();\n    });\n  }\n\n  async getWeather() {\n    // let cityValue = this.cityInput.value;\n    try {\n      console.log(\"MISSING_ENV_VAR\");\n      const response = await fetch(\n        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.cityInput.value}?key=${\"ZSDFHZX585XMCF2B2ZAKNW4CH\"}`\n      );\n      console.log(response);\n      if (response.status === 200) {\n        let weatherData = await response.json();\n        console.log(weatherData, typeof weatherData);\n        this.dataElement.insertAdjacentHTML(\"beforeend\", `${weatherData.resolvedAddress.toUpperCase()}: ${JSON.stringify(weatherData.currentConditions.temp)}`);\n      } else {\n        throw new Error(await response.json()); \n      }\n    } catch (err) {\n        console.log(err); \n        // call UI update\n        return; \n    }\n  }\n\n  handleKeyDown(e) {\n    if (e.key === \"Enter\" && this.cityInput.value.length >= 3) {\n      this.clearCityData();\n      this.getWeather();\n    } else {\n      return;\n    }\n  }\n\n  clearCityData() {\n    this.dataElement.innerHTML = \"\";\n  }\n}\n\nconst app = new WeatherApp(document.querySelector(\"#container\"));\n\n\n//# sourceURL=webpack://template-repository/./src/index.js?");

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