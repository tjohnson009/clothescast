import { parseISO, format } from "date-fns";  
// const datefns = require("date-fns"); 

let setForecastDivs = (data) => {
  console.log(data.days); 
  data.days.forEach(day => {
    // console.log('Date.datetime', new Date(day.datetime));
    // console.log('Day.datetime', day.datetime); 
  // datetime looks like this: "2024-07-31"
    let html = `<div class="day">
      <div class="day-date">${format(parseISO(day.datetime), 'EEEE (do)')}</div>
      <div class="day-icon"><img class='svg-icon-small' src='../src/icons/weather/line/all/${day.icon}.svg'></div>
      <div class="day-high">${day.tempmax}</div>
      <div class="day-low">${day.tempmin}</div> 
      <div class="day-wind">
      <span class='day-winddir'>${day.winddir}</span><span class='day-windspeed'>${day.windspeed}</span>
      </div>
  </div>`; 


      // console.log('html', html); 
      const forecastDiv = document.querySelector('.forecast');
      forecastDiv.insertAdjacentHTML('beforeend', html); 
    }); 

    }; 

export default setForecastDivs; 