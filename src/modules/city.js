const citylocation = document.getElementById('city');

const API_KEY2 ='f284944deaf6330fcff0faaaf0f8aa68';

getLocationData();
function getLocationData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY2}`)
        .then(res => res.json())
        .then(data => {
        
        console.log(data);
        alert(data[0].name);
        citylocation.innerHTML = data[0].name;
    });
        
    });
};

const city = {getLocationData};
export default city;