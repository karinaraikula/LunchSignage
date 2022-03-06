const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai']
const months = ['Tammikuuta', 'Helmikuuta', 'Maaliskuuta', 'Huhtikuuta', 'Toukokuuta', 'Kesäkuuta', 'Heinäkuuta', 'Elokuuta', 'Syyskuuta', 'Lokakuuta', 'Marraskuuta', 'Joulukuuta'];

const API_KEY ='fcaad45fa4028c3aa51faecc8f25d3ab';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    let minutes = time.getMinutes();
    minutes = minutes <= 9 ? '0' + minutes : minutes;


    timeEl.innerHTML = hour + '.' + minutes;

    dateEl.innerHTML = days[day] + ', ' + date+ '. päivä ' + months[month]

}, 1000);

getWeatherData();

function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
        
        console.log(data)
        showWeatherData(data);
        })

    })
}


function showWeatherData (data){

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E';

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentWeatherItemsEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="temp">Päivällä  ${Math.floor(day.temp.day)}&#176;C</div>
                <div class="temp">Yöllä  ${Math.floor(day.temp.night)}&#176;C</div>
            </div>
            
            `
        }
    })
}
