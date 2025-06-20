
const setWindDirections = () => {
    let windDirectionElements = Array.from(document.querySelectorAll('.winddir')); 
    // console.log(windDirectionElements); 
    // get the wind direction number from the element

    windDirectionElements.forEach(el => {
        let degrees = parseInt(el.innerHTML);  
        el.innerHTML = ''; 
        el.insertAdjacentHTML('beforeend', `<img class='svg-icon-small' src='../public/icons/arrow2.svg'>`); 
        let img = el.querySelector('img'); 
        img.style.transform = `rotate(${degrees + 180}deg)`; 
        
        // add 180 degree
        
        // set the arrow in the direction
        
        // append to DOM
    })
  }

  export default setWindDirections; 