
let citySearch = document.getElementById("citySearch");

let currntDay = document.getElementById("currntDay");
let currntDate = document.getElementById("currntDate");

let country = document.getElementById("country");
let currntTemp = document.getElementById("currntTemp");
let currntText = document.getElementById("currntText");
let currntImg = document.getElementById("currntImg");


let nextDay = document.getElementById("nextDay");
let nextTempM = document.getElementById("nextTempM");
let nextTempL = document.getElementById("nextTempL");
let nextText = document.getElementById("nextText");
let nextImg = document.getElementById("nextImg")

let theNextDay = document.getElementById("theNextDay");
let theNextTempM = document.getElementById("theNextTempM");
let theNextTempL = document.getElementById("theNextTempL");
let theNextText = document.getElementById("theNextText");
let theNextImg = document.getElementById("theNextImg");

let searchLocation = []
let tempToDay = []
let imgToDay = []
let textToday = []
let todayNumber = []

let tempMTomorrow = []
let tempLTomorrow = []
let textTomorrow = []
let imgTomorrow = []
let tomorrowNumber = []

let tempMTheNextDay = []
let tempLTheNextDay = []
let textTheNextDay = []
let imgTheNextDay = []
let theNextDayNumber = []

async function getNews(city){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5065ed7f58304ddabd2141137241001&q=${city}&days=3`);
    let finalResponse = await response.json();

    searchLocation = finalResponse.location.name
    tempToDay = finalResponse.current.temp_c
    imgToDay = finalResponse.current.condition.icon
    textToday = finalResponse.forecast.forecastday[0].day.condition.text
    todayNumber = finalResponse.forecast.forecastday[0].date

    tempMTomorrow = finalResponse.forecast.forecastday[1].day.maxtemp_c
    tempLTomorrow = finalResponse.forecast.forecastday[1].day.mintemp_c
    textTomorrow = finalResponse.forecast.forecastday[1].day.condition.text
    imgTomorrow = finalResponse.forecast.forecastday[1].day.condition.icon
    tomorrowNumber = finalResponse.forecast.forecastday[1].date

    tempMTheNextDay = finalResponse.forecast.forecastday[2].day.maxtemp_c
    tempLTheNextDay = finalResponse.forecast.forecastday[2].day.mintemp_c
    textTheNextDay = finalResponse.forecast.forecastday[2].day.condition.text
    imgTheNextDay = finalResponse.forecast.forecastday[2].day.condition.icon
    theNextDayNumber = finalResponse.forecast.forecastday[2].date

    displayToday()
    displayTomorrow()
    displayNextDay()

}
getNews("egypt")

function search(){

    let term = citySearch.value

    if(validationWeather()==true){
        getNews(`${term}`)
    }
    
}

function displayToday(){
    country.innerHTML=searchLocation;
    currntTemp.innerHTML = `<h2>${tempToDay}<sup>o</sup>c</h2>`
    currntImg.innerHTML = `<img src="https:${imgToDay}" alt="today weather">`
    currntText.innerHTML = `<p>${textToday}</p>`

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(`${todayNumber}`);
    let month = months[d.getMonth()];
    let dayName = weekday[d.getDay()];

    currntDay.innerHTML = dayName;
    currntDate.innerHTML =[d.getDate(), month];
}

function displayTomorrow(){
    nextTempM.innerHTML = `${tempMTomorrow}<sup>o</sup>C`
    nextTempL.innerHTML = `<small>${tempLTomorrow}<sup>o</sup></small>`
    nextText.innerHTML = `${textTomorrow}`
    nextImg.innerHTML = `<img src="https:${imgTomorrow}" alt="tomorrow weather">`

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(`${tomorrowNumber}`);
    let dayName = weekday[d.getDay()];
    nextDay.innerHTML = dayName
}

function displayNextDay(){
    theNextTempM.innerHTML = `${tempMTheNextDay}<sup>o</sup>C`
    theNextTempL.innerHTML = `<small>${tempLTheNextDay}<sup>o</sup></small>`
    theNextText.innerHTML = `${textTheNextDay}`
    theNextImg.innerHTML = `<img src="https:${imgTheNextDay}" alt="next day weather">`

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(`${theNextDayNumber}`);
    let dayName = weekday[d.getDay()];
    theNextDay.innerHTML = dayName
}


function validationWeather(){

    var regexWeather = /^[a-zA-Z]{3,}$/;

    if(regexWeather.test(citySearch.value)){
        return true
    }else {
        return false
    }
}

