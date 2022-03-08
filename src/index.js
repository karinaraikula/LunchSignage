import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import { fetchData } from './modules/network';
import { getTodayIndex } from './modules/tools';
import HSLData from './modules/hsl-data';
import weatherData from './modules/weather';
import city from './modules/city';

let language = 'fi';

/**
 * Renders menu courses on page
 */
const renderMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
  }
};

/**
 * Toggle between en/fi
 */
const switchLanguage = () => {
  if (language === 'fi') {
    language = 'en';
    console.log('lang is en');
    renderMenu(SodexoData.title_en, 'sodexo');
    renderMenu(FazerData.title_en, 'fazer');
  } else {
    language = 'fi';
    console.log('lang is fi');
    renderMenu(SodexoData.title_fi, 'sodexo');
    renderMenu(FazerData.title_fi, 'fazer');
  }
};
const switchRestaurant = () => {
  let sodexo = document.getElementById("sodexo");
  let fazer = document.getElementById("fazer");
  let toiminimi = document.getElementById("toiminimi");

  if (sodexo.style.display === "none") {
    sodexo.style.display = "block";
    fazer.style.display = "none";
    toiminimi.innerHTML = "Myyrmäen lounas:";
  } else {
    sodexo.style.display = "none";
    fazer.style.display = "block";
    toiminimi.innerHTML = "Karamalmin lounas:";

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



const init = () => {
  createViewCarousel(0, 10);

  fetchData(FazerData.dataUrlFi, {}, 'fazer-php').then(data => {
    const courses = FazerData.parseDayMenu(data.LunchMenus, getTodayIndex());
    renderMenu(courses, 'fazer');
  });
  fetchData(SodexoData.dataUrlDaily).then(data => {
    console.log('sodexo', data);
    const courses = SodexoData.parseDayMenu(data.courses);
    renderMenu(courses, 'sodexo');
  });

  // Event listeners for buttons
  /*
   document.getElementById('switch-lang').addEventListener('click', () => {
     switchLanguage();
   });
   */
  document.getElementById('switch-rest').addEventListener('click', () => {
    switchRestaurant();
  });



  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: HSLData.getQueryForNextRidesByStopId(),

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
    <li class="hsl-stop>"${stop.name}</li>
    <li class="hsl-line>"${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</li>
    <li class="hsl-destination">${stop.stoptimesWithoutPatterns[i].headsign}<li>
    <li class="hsl-time>"${localeSpecificTime.replace('PM', '')}</li>
    </ul>
  `;
  
  };
});

};

init();



/*
    document.getElementsByClassName('hsl-data').innerHTML = `
   
    <div>${stop.name}</div>
    <div>${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
    <div>${stop.stoptimesWithoutPatterns[i].headsign} </div>
    <div>${localeSpecificTime.replace('PM', '')}</div>
    */


