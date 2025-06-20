const updateClothesCast = (data) => { 
    let clothingItems = Array.from(document.querySelectorAll('.clothing-item')); // shirt,shorts, shoes, umbrella
    let today = data.days[0]; 
    // let element = `<img src="/icons/clothes/heavycoat.svg" class="svg-icon" alt="">`; \
    //umbrella
    if (today.precipprob <= 50 && today.precipprob > 20) { // likely rain
        clothingItems[3].innerHTML = `<img src="/icons/clothes/closedumbrella.svg" class="svg-icon" alt=""></img>`
    } else if (today.precipprob > 50) {
        clothingItems[3].innerHTML = `<img src="/icons/clothes/openumbrella.svg" class="svg-icon" alt=""></img>`;
        clothingItems[2].innerHTML = `<img src="/icons/clothes/boots.svg" class="svg-icon" alt=""></img>`;
    } else {
        clothingItems[3].innerHTML = ''; 
    }

    //shoes 
    if (today.snow || today.precip > 2) {
        clothingItems[2].innerHTML = `<img src="/icons/clothes/boots.svg" class="svg-icon" alt=""></img>`
    } else if (today.feelslikeMax > 100 && today.precipprob < 20) { 
        clothingItems[3].innerHTML = `<img src="/icons/clothes/sandals.svg" class="svg-icon" alt=""></img>`
    } else if (today.feelslikeMax > 50 && today.feelslikeMax < 100) {
        clothingItems[2].innerHTML = `<img src="/icons/clothes/sneakers.svg" class="svg-icon" alt=""></img>`;
    } else {
        clothingItems[2].innerHTML = `<img src="/icons/clothes/sneakers.svg" class="svg-icon" alt=""></img>`; 
    }

    // pants
    if (today.tempmin < 70 && today.tempmin > 55) {
        clothingItems[1].innerHTML = `<img src="/icons/clothes/pants.svg" class="svg-icon" alt=""></img>`;
    } else if (today.tempmin <= 55) {
        clothingItems[1].innerHTML = `<img src="/icons/clothes/jeans.svg" class="svg-icon" alt=""></img>`;
    } else {
        clothingItems[1].innerHTML = `<img src="/icons/clothes/shorts.svg" class="svg-icon" alt=""></img>`;
    }

    //shirt 
    if (today.precipprob > 50 && today.tempMax < 75) {
        clothingItems[0].innerHTML = `<img src="/icons/clothes/lightjacket.svg" class="svg-icon" alt=""></img>`;
    } else if (today.snow || today.tempmin < 50) {
        clothingItems[0].innerHTML = `<img src="/icons/clothes/heavycoat.svg" class="svg-icon" alt=""></img>`;
    } else if (today.precip === 0 && today.tempMax >= 90) {
        clothingItems[0].innerHTML = `<img src="/icons/clothes/tanktop.svg" class="svg-icon" alt=""></img>`;
    } else if (today.feelslikeMax < 70) {
        clothingItems[0].innerHTML = `<img src="/icons/clothes/longsleeve.svg" class="svg-icon" alt=""></img>`;
    } else if (today.tempmin < 60) {
        clothingItems[0].innerHTML = `<img src="/icons/clothes/lightjacket.svg" class="svg-icon" alt=""></img>`;
    } else {
        clothingItems[0].innerHTML = `<img src="/icons/clothes/shortsleeve.svg" class="svg-icon" alt=""></img>`;
    }
    }; 

export default updateClothesCast; 