const citylocation = document.getElementById('city');
const API_KEY2 ='9ed765d6ed3c9ff04c739ca0b78dfa41';

/**
 * Coordinates to find Espoo location
 */
function getEspooLocationData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        // Espoon koordinaatit Karamalmin sään paikkakuntatietoa varten
        let latitude = 60.221472612774306; 
        let longitude = 24.65724272877412;

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY2}`)
        .then(res => res.json())
        .then(data => {
        
        console.log(data);
        citylocation.innerHTML = data[0].name;
    });
        
    });
};

/**
 * Coordinates to find Helsinki location
 */
function getHelsinkiLocationData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        // Helsingin koordinaatit Arabian ja Myllypuron sään paikkakuntatietoa varten
        let latitude = 60.18711019255528; 
        let longitude  = 24.933517758942358;

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY2}`)
        .then(res => res.json())
        .then(data => {
        
        console.log(data);
        citylocation.innerHTML = data[0].name;
    });
        
    });
};
/**
 * Coordinates to find Vantaa location
 */
function getVantaaLocationData () {
    navigator.geolocation.getCurrentPosition((success) => {
        // Vantaan koordinaatit Myyrmäen sään paikkakuntatietoa varten
       
        let latitude = 60.301040343507566;
        let longitude = 25.037073773065387;

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY2}`)
        .then(res => res.json())
        .then(data => {
        
        console.log(data);
        citylocation.innerHTML = data[0].name;
    });
        
    });
};

const city = {getEspooLocationData, getHelsinkiLocationData, getVantaaLocationData};
export default city;