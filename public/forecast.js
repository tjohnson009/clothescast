import { parseISO, format } from "date-fns";  
// const datefns = require("date-fns"); 

let setForecastDivs = async (data, app) => {
  try {

    console.log(data.days); 
    data.days.forEach(day => {
      // console.log('Date.datetime', new Date(day.datetime));
      // console.log('Day.datetime', day.datetime); 
      // datetime looks like this: "2024-07-31"
      let html = `<div class="day">
      <div class="day-date">${format(parseISO(day.datetime), 'EEEE (do)')}</div>
      <div class="day-icon"><img class='svg-icon-small' src='icons/weather/line/all/${day.icon}.svg'></div>
      <div class="day-high temperature-number datapoint ${app.measurement}">${Number.parseInt(day.tempmax).toFixed()}</div>
      <div class="day-low temperature-number datapoint ${app.measurement}">${Number.parseInt(day.tempmin).toFixed()}</div> 
      <div class="day-wind">
      <span class='day-winddir winddir'>${day.winddir}</span><span><span class='day-windspeed speed datapoint'>${day.windspeed}</span><span class="${app.measurement} speed">${app.measurement === 'metric' ? 'kmh' : 'mph'}</span></span>
      </div>
      </div>`; 
      
      
      // console.log('html', html); 
      const forecastDiv = document.querySelector('.forecast');
      forecastDiv.insertAdjacentHTML('beforeend', html); 
    }); 
    
  } catch(err) {
    console.error(`Error setting 15 day forecasts: ${err}`); 
  }
}

export default setForecastDivs; 