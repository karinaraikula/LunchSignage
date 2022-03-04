'use strict';
//const ikoniElementtiRuka = document.querySelector('.weatherikoni');
const lampotilaElementtiRuka = document.querySelector('.lampotila p');



// Rukan koordinaatit
const coords = [
  66.1690081362218,
  29.16642564990237,
  67.80417221848137,
  24.808682895041365];
const rukaLat = coords[0];
const rukaLng = coords[1];


const weather = {};
weather.temperature = {
  unit: 'celcius',  // Asetetaan lÃ¤mpÃ¶tilan mittausyksikkÃ¶ celciukseksi
};

const kelvinit = 273;
const avain = '9025454b3f1c8837bb18596e196c64b0';


// Asetetaan sijainti josta lÃ¤mpÃ¶tila haetaan. 
function setPosition() {

    let latitude = rukaLat;
    let longitude = rukaLng;
    getWeather(latitude, longitude);
  } 


// Haetaan sÃ¤Ã¤ Openweathermap API:lla
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${avain}`;

  fetch(api).then(function(response) {
    let data = response.json();
    console.log(data);
    return data;

  }).then(function(data) {
    weather.temperature.value = Math.floor(data.main.temp - kelvinit);
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  }).then(function() {
    if (latitude === rukaLat) {
      displayWeather();
    } 
  });
}

// Tulostetaan sÃ¤Ã¤ HTML:Ã¤Ã¤n
function displayWeather() {

    //ikoniElementtiRuka.innerHTML = `<img src="images/icons/${weather.iconId}.png"/>`;
    lampotilaElementtiRuka.innerHTML = `<b>${weather.temperature.value}Â°<span>C</span></b>`;

}