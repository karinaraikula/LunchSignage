import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import { fetchData } from './modules/network';
import { getTodayIndex } from './modules/tools';
import HSLData from './modules/hsl-data';
import weatherData from './modules/weather';
import city from './modules/city';

let lang = 'fi';

/**
 * Renders menu courses on page
 */
const renderKaramalmiMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
  }
};

const renderArabiaMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
  }
};

const renderMyrtsiMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
  }
};

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

//language change button
document.getElementById('switch-lang').addEventListener('click', () => {
  switchLanguage();
});

/*
 * Toggle between en/fi
 * */
const switchLanguage = () => {
  if (lang == 'fi') {
    lang = 'en';
    console.log('lang is en');
  } else {
    lang = 'fi';
    console.log('lang is fi');
  }
};

const fazerKaramalmi = () => {
  fetchData(FazerData.fazerKaramalmiFiUrl, {}, 'fazer-php').then(data => {
    console.log('karamalmi', data);
    const courses = FazerData.parseDayMenu(data.LunchMenus, getTodayIndex());
    renderKaramalmiMenu(courses, 'menu');
  });
};

const fazerArabia = () => {
  fetchData(FazerData.fazerArabiaFiUrl, {}, 'fazer-php').then(data => {
    console.log('arabia', data);
    const courses = FazerData.parseDayMenu(data.LunchMenus, getTodayIndex());
    renderArabiaMenu(courses, 'menu');
  });
};

const sodexoMyrtsi = () => {
  fetchData(SodexoData.sodexoMyrtsiDataUrl).then(data => {
    console.log('myyrmäki', data);
    const courses = SodexoData.parseDayMenu(data.courses);
    renderMyrtsiMenu(courses, 'menu');
  });
};

const sodexoMylly = () => {
  fetchData(SodexoData.sodexoMyllyDataUrl).then(data => {
    console.log('myllypuro', data);
    const courses = SodexoData.parseDayMenu(data.courses);
    renderMyllyMenu(courses, 'menu');
  });
};

document.getElementById('karamalmi-btn').addEventListener("click", function () {
  fazerKaramalmi(),
  karamalmiHSL();
});
document.getElementById('arabia-btn').addEventListener("click", function () {
  fazerArabia(),
  arabiaHSL();
});

document.getElementById('mylly-btn').addEventListener("click", function () {
  sodexoMylly(),
  myllypuroHSL();
});

document.getElementById('myrtsi-btn').addEventListener("click", function () {
  sodexoMyrtsi(),
  myrtsiHSL();
});

const karamalmiHSL = () => {

  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForNextRidesByStopId(2132207),

  }).then(response => {
    // TODO: create separate render HSL data functions (in HSLData module maybe?)
    const stop = response.data.stop;
    const hslContent = document.querySelector('.hsl-data');
    hslContent.innerHTML = ``;

    console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);

    for (let i = 0; i < 4; i++) {
      const stop = response.data.stop;
      let time = new Date((stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
      let localeSpecificTime = time.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });

      console.log(stop.name, stop.stoptimesWithoutPatterns[i].trip.routeShortName, stop.stoptimesWithoutPatterns[i].headsign, localeSpecificTime);

      hslContent.innerHTML += `
  <ul class="hsl-row">
    <li class="hsl-stop">${stop.name}</li>
    <li class="hsl-line">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</li>
    <li class="hsl-destination">${stop.stoptimesWithoutPatterns[i].headsign}</li>
    <li class="hsl-time">${localeSpecificTime.replace('PM', '')}</li>
  </ul>
`;
    };
  });
};

const arabiaHSL = () => {

  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForNextRidesByStopId(1230104),

  }).then(response => {
    // TODO: create separate render HSL data functions (in HSLData module maybe?)
    const stop = response.data.stop;
    const hslContent = document.querySelector('.hsl-data');
    hslContent.innerHTML = ``;

    console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);

    for (let i = 0; i < 4; i++) {
      const stop = response.data.stop;
      let time = new Date((stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
      let localeSpecificTime = time.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });

      console.log(stop.name, stop.stoptimesWithoutPatterns[i].trip.routeShortName, stop.stoptimesWithoutPatterns[i].headsign, localeSpecificTime);

      hslContent.innerHTML += `
  <ul class="hsl-row">
    <li class="hsl-stop">${stop.name}</li>
    <li class="hsl-line">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</li>
    <li class="hsl-destination">${stop.stoptimesWithoutPatterns[i].headsign}</li>
    <li class="hsl-time">${localeSpecificTime.replace('PM', '')}</li>
  </ul>
`;
    };
  });
};

const myllypuroHSL = () => {

  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForNextRidesByStopId(1454112),

  }).then(response => {
    // TODO: create separate render HSL data functions (in HSLData module maybe?)
    const stop = response.data.stop;
    const hslContent = document.querySelector('.hsl-data');
    hslContent.innerHTML = ``;

    console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);

    for (let i = 0; i < 4; i++) {
      const stop = response.data.stop;
      let time = new Date((stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
      let localeSpecificTime = time.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });

      console.log(stop.name, stop.stoptimesWithoutPatterns[i].trip.routeShortName, stop.stoptimesWithoutPatterns[i].headsign, localeSpecificTime);

      hslContent.innerHTML += `
  <ul class="hsl-row">
    <li class="hsl-stop">${stop.name}</li>
    <li class="hsl-line">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</li>
    <li class="hsl-destination">${stop.stoptimesWithoutPatterns[i].headsign}</li>
    <li class="hsl-time">${localeSpecificTime.replace('PM', '')}</li>
  </ul>
`;
    };
  });
};

const myrtsiHSL = () => {

  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForNextRidesByStopId(4150296),

  }).then(response => {
    // TODO: create separate render HSL data functions (in HSLData module maybe?)
    const stop = response.data.stop;
    const hslContent = document.querySelector('.hsl-data');
    hslContent.innerHTML = ``;

    console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);

    for (let i = 0; i < 4; i++) {
      const stop = response.data.stop;
      let time = new Date((stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
      let localeSpecificTime = time.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });

      console.log(stop.name, stop.stoptimesWithoutPatterns[i].trip.routeShortName, stop.stoptimesWithoutPatterns[i].headsign, localeSpecificTime);

      hslContent.innerHTML += `
  <ul class="hsl-row">
    <li class="hsl-stop">${stop.name}</li>
    <li class="hsl-line">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</li>
    <li class="hsl-destination">${stop.stoptimesWithoutPatterns[i].headsign}</li>
    <li class="hsl-time">${localeSpecificTime.replace('PM', '')}</li>
  </ul>
`;
    };
  });
};


const init = () => {

  createViewCarousel(0, 10);
  fazerKaramalmi();
 
};




init();



