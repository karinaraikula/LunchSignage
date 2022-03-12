const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');

const days = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
const months = ['tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta', 'kesäkuuta', 'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta', 'marraskuuta', 'joulukuuta'];

const API_KEY = '97d0528f2a0c2cb79ef4f062a908b0aa';

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


function getKaraWeatherData() {

        let latitude = 60.22420358645741;
        let longitude = 24.75871989867972;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {

                console.log(data);
                showWeatherData(data);
            });

};

function getArabiaWeatherData() {

    let latitude = 60.2101128006593; 
    let longitude = 24.97679728639828;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {

            console.log(data);
            showWeatherData(data);
        });

};

function getMyllyWeatherData() {

    let latitude = 60.22356304765007;
    let longitude = 25.077890412173137;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {

            console.log(data);
            showWeatherData(data);
        });

};

function getMyrtsiWeatherData() {

    let latitude = 60.25887528663568; 
    let longitude = 24.84488187169426;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {

            console.log(data);
            showWeatherData(data);
        });

};

function showWeatherData(data) {

    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentWeatherItemsEl.innerHTML = `
            
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
       
            <div class="other"> ${Math.floor(day.temp.day)}&#176;C</div>
            `;
        };
    });
};



const weatherData = {timeEl, dateEl, currentWeatherItemsEl, days, months, API_KEY, setInterval, getKaraWeatherData, getArabiaWeatherData, getMyllyWeatherData, getMyrtsiWeatherData, showWeatherData};
export default weatherData;
