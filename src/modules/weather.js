const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');

const days = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
const months = ['tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta', 'kesäkuuta', 'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta', 'marraskuuta', 'joulukuuta'];

const API_KEY = '13e568b3ff31436cc2ee296f443fb047';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    let minutes = time.getMinutes();
    minutes = minutes <= 9 ? '0' + minutes : minutes;


    timeEl.innerHTML = hour + '.' + minutes;

    dateEl.innerHTML = days[day] + '<br>' + date + '. ' + months[month];
}, 1000);

getWeatherData();

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {

                console.log(data);
                showWeatherData(data);
            });

    });
};


function showWeatherData(data) {
    let otherDayForcast = '';
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentWeatherItemsEl.innerHTML = `
            
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
       
            <div class="other"> ${Math.floor(day.temp.day)}&#176;C</div>
            `;
        };
    });
};



const weatherData = {timeEl, dateEl, currentWeatherItemsEl, days, months, API_KEY, setInterval, getWeatherData, showWeatherData};
export default weatherData;
