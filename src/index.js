import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import { fetchData } from './modules/network';
import { getTodayIndex } from './modules/tools';
import HSLData from './modules/hsl-data';
import weatherData from './modules/weather';
import city from './modules/city';

let lang = 'fi';

/**
 * Renders Karamalmi menu on page
 * @param {Array} data - menudata
 * @param {string} targetId - where menu is rendered
 */
const renderKaramalmiMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
  }
  document.getElementById("dropdown").innerHTML = "Karamalmi"; //ilman tätä kampusvalikkonappi katoaa


};
/**
 * Renders Arabia menu on page
 * @param {Array} data - menudata
 * @param {string} targetId - where menu is rendered
 */
const renderArabiaMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
  }

};
/**
 * Renders Myyrmaki menu on page
 * @param {Array} data - menudata
 * @param {string} targetId - where menu is rendered
 */
const renderMyrtsiMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
  }

};
/**
 * Renders Myllypuro menu on page
 * @param {Array} data - menudata
 * @param {string} targetId - where menu is rendered
 */
const renderMyllyMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
  }
};

/**
 * Display pages/vies in carousel mode
 *
 * @param {number} activeView - view index to be displayed
 * @param {number} duration - seconds between page updated
 */
const createViewCarousel = (activeView, duration) => {
  const views = document.querySelectorAll('article');
  for (const view of views) {
    view.style.display = 'none';
  }
  if (activeView === views.length) {
    activeView = 0;
  }
  views[activeView].style.display = 'block';
  setTimeout(() => {
    createViewCarousel(activeView + 1, duration);
  }, duration * 500);
};


/**
 * Fetches daily menu data
 */
const fazerKaramalmi = () => {
  fetchData(FazerData.fazerKaramalmiFiUrl, {}, 'fazer-php').then(data => {
    console.log('karamalmi', data);
    if (data.courses == null) {
      document.getElementById('menu').innerHTML = 'Ei lounastarjoilua';
    }
    const courses = FazerData.parseDayMenu(data.LunchMenus, getTodayIndex());
    renderKaramalmiMenu(courses, 'menu');

  });
};

/**
 * Fetches daily menu data
 */
const fazerArabia = () => {
  fetchData(FazerData.fazerArabiaFiUrl, {}, 'fazer-php').then(data => {
    console.log('arabia', data);
    if (data.courses == null) {
      document.getElementById('menu').innerHTML = 'Ei lounastarjoilua';
    }
    const courses = FazerData.parseDayMenu(data.LunchMenus, getTodayIndex());
    renderArabiaMenu(courses, 'menu');
  });
};

/**
 * Fetches daily menu data
 */
const sodexoMyrtsi = () => {
  fetchData(SodexoData.sodexoMyrtsiDataUrl).then(data => {
    console.log('myyrmäki', data);
    if (data.courses == null) {
      document.getElementById('menu').innerHTML = 'Ei lounastarjoilua';
    }
    const courses = SodexoData.parseDayMenu(data.courses);
    renderMyrtsiMenu(courses, 'menu');

  });
};

/**
 * Fetches daily menu data
 */
const sodexoMylly = () => {
  fetchData(SodexoData.sodexoMyllyDataUrl).then(data => {
    console.log('myllypuro', data);
    if (data.courses == null) {
      document.getElementById('menu').innerHTML = 'Ei lounastarjoilua';
    }
    const courses = SodexoData.parseDayMenu(data.courses);
    renderMyllyMenu(courses, 'menu');
  });
};

/*
Intervallit oli pakko määritellä var-muuttujaksi, 
sillä muuten ne eivät olisi näkyneet 
ja ollut muutettavissa jokaisen clicki-elementtilistenerin sisällä
*/
var interval;
var weatherinterval;

/**
 * Event listener for campus button
 * renders campus data
 */
document.getElementById('karamalmi-btn').addEventListener("click", function () {
  fazerKaramalmi(),
    karamalmiHSL();
  document.getElementById("dropdown").innerHTML = "Karamalmi";

  city.getEspooLocationData();
  weatherData.getKaraWeatherData();

  // tyhjennetään mahdolliset edelliset ajastimet, jottei ajastuksia pyöri päällekkäin
  clearInterval(interval, weatherinterval);

  // HSL-data päivittyy 30 sekunnin välein
  interval = setInterval(() => {
    karamalmiHSL();
  }, 30000);

  // Sää-data päivittyy tunnin välein
  weatherinterval = setInterval(() => {
    weatherData.getKaraWeatherData();
  }, 3600000);

});

/**
 * Event listener for campus button
 * renders campus data
 */
document.getElementById('arabia-btn').addEventListener("click", function () {
  fazerArabia(),
    arabiaHSL();
  city.getHelsinkiLocationData();
  weatherData.getArabiaWeatherData();

  clearInterval(interval, weatherinterval);

  document.getElementById("dropdown").innerHTML = "Arabia";

  interval = setInterval(() => {
    arabiaHSL();
  }, 30000);

  weatherinterval = setInterval(() => {
    weatherData.getArabiaWeatherData();
  }, 3600000);

});

/**
 * Event listener for campus button
 * renders campus data
 */
document.getElementById('mylly-btn').addEventListener("click", function () {
  sodexoMylly(),
    myllypuroHSL();
  city.getHelsinkiLocationData();
  weatherData.getMyllyWeatherData();

  clearInterval(interval, weatherinterval);

  document.getElementById("dropdown").innerHTML = "Myllypuro";

  interval = setInterval(() => {
    myllypuroHSL();
  }, 30000);


  weatherinterval = setInterval(() => {
    weatherData.getMyllyWeatherData();
  }, 3600000);


});

/**
 * Event listener for campus button
 * renders campus data
 */
document.getElementById('myrtsi-btn').addEventListener("click", function () {
  sodexoMyrtsi(),
    myrtsiHSL();
  city.getVantaaLocationData();
  weatherData.getMyrtsiWeatherData();
  clearInterval(interval, weatherinterval);

  document.getElementById("dropdown").innerHTML = "Myyrmäki";

  interval = setInterval(() => {
    myrtsiHSL();
  }, 30000);

  weatherinterval = setInterval(() => {
    weatherData.getMyrtsiWeatherData();
  }, 3600000);
});


/**
 * Initialise the app
 */
const init = () => {
  createViewCarousel(0, 10);
  fazerKaramalmi();
  karamalmiHSL();
  city.getEspooLocationData();
  weatherData.getKaraWeatherData();

  clearInterval(interval, weatherinterval);

  interval = setInterval(() => {
    karamalmiHSL();
  }, 30000);

  weatherinterval = setInterval(() => {
    weatherData.getKaraWeatherData();
  }, 3600000);

};

/*
* Fetch HSL data from api
* InnerHTML to set HSL data on page when called
*/
const karamalmiHSL = () => {
  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForNextRidesByStopId(2132207),

  })
    .then(response => {
      const stop = response.data.stop;
      const hslContent = document.querySelector('.hsl-data');
      hslContent.innerHTML = ``;
      const pysakki = document.querySelector('#pysakki');
      pysakki.innerHTML = stop.name;

      for (let i = 0; i < 5; i++) {
        const stop = response.data.stop;
        let time = new Date((stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
        let localeSpecificTime = time.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });

        console.log(stop.name, stop.stoptimesWithoutPatterns[i].trip.routeShortName, stop.stoptimesWithoutPatterns[i].headsign, localeSpecificTime);

        hslContent.innerHTML += `
  <div class="flex" id="hsljuttu">
    <div class="flex routename hsl-line">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
    <div class="flex headsign">${stop.stoptimesWithoutPatterns[i].headsign}</div>
    <div class="flex hsltime ">${localeSpecificTime.replace('PM', '')}</div>
  </div>
`;
      };
    });
};

/*
* Fetch HSL data from api
* InnerHTML to set HSL data on page when called
*/
const arabiaHSL = () => {
  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForNextRidesByStopId(1230104),

  }).then(response => {
    const stop = response.data.stop;
    const hslContent = document.querySelector('.hsl-data');
    hslContent.innerHTML = ``;
    const pysakki = document.querySelector('#pysakki');
    pysakki.innerHTML = stop.name;

    for (let i = 0; i < 5; i++) {
      const stop = response.data.stop;
      let time = new Date((stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
      let localeSpecificTime = time.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });

      console.log(stop.name, stop.stoptimesWithoutPatterns[i].trip.routeShortName, stop.stoptimesWithoutPatterns[i].headsign, localeSpecificTime);

      hslContent.innerHTML += `
      <div class="flex" id="hsljuttu">
      <div class="flex routename hsl-line">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
      <div class="flex headsign">${stop.stoptimesWithoutPatterns[i].headsign}</div>
      <div class="flex hsltime ">${localeSpecificTime.replace('PM', '')}</div>
    </div>
`;
    };
  });
};

/*
* Fetch HSL data from api
* InnerHTML to set HSL data on page when called
*/
const myllypuroHSL = () => {

  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForNextRidesByStopId(1454112),

  }).then(response => {
    const stop = response.data.stop;
    const hslContent = document.querySelector('.hsl-data');
    hslContent.innerHTML = ``;
    const pysakki = document.querySelector('#pysakki');
    pysakki.innerHTML = stop.name;

    for (let i = 0; i < 5; i++) {
      const stop = response.data.stop;
      let time = new Date((stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
      let localeSpecificTime = time.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });

      console.log(stop.name, stop.stoptimesWithoutPatterns[i].trip.routeShortName, stop.stoptimesWithoutPatterns[i].headsign, localeSpecificTime);

      hslContent.innerHTML += `
      <div class="flex" id="hsljuttu">
      <div class="flex routename hsl-line">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
      <div class="flex headsign">${stop.stoptimesWithoutPatterns[i].headsign}</div>
      <div class="flex hsltime ">${localeSpecificTime.replace('PM', '')}</div>
    </div>
`;
    };
  });
};

/*
* Fetch HSL data from api
* InnerHTML to set HSL data on page when called
*/
const myrtsiHSL = () => {

  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForNextRidesByStopId(4150296),

  }).then(response => {
    const stop = response.data.stop;
    const hslContent = document.querySelector('.hsl-data');
    hslContent.innerHTML = ``;
    const pysakki = document.querySelector('#pysakki');
    pysakki.innerHTML = stop.name;

    for (let i = 0; i < 5; i++) {
      const stop = response.data.stop;
      let time = new Date((stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
      let localeSpecificTime = time.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });

      console.log(stop.name, stop.stoptimesWithoutPatterns[i].trip.routeShortName, stop.stoptimesWithoutPatterns[i].headsign, localeSpecificTime);

      hslContent.innerHTML += `
      <div class="flex" id="hsljuttu">
      <div class="flex routename hsl-line">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
      <div class="flex headsign">${stop.stoptimesWithoutPatterns[i].headsign}</div>
      <div class="flex hsltime ">${localeSpecificTime.replace('PM', '')}</div>
    </div>
`;
    };
  });
};

init();




//Language switch, not currently used, but can be developed from here
/*
 * Toggle between en/fi
 * */
/*
const switchLanguage = () => {
  if (lang == 'fi') {
    lang = 'en';
    console.log('lang is en');
  } else {
    lang = 'fi';
    console.log('lang is fi');
  }
};
//language change button
document.getElementById('switch-lang').addEventListener('click', () => {
  switchLanguage();
});
*/