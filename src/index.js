import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import { fetchData } from './modules/network';
import { getTodayIndex } from './modules/tools';

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
    toiminimi.innerHTML="Myllypuron lounas:";
  } else {
    sodexo.style.display = "none";
    fazer.style.display = "block";
    toiminimi.innerHTML="Karamalmin lounas:";

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
  }, duration * 1000);
};

const init = () => {
  createViewCarousel(0, 10);

  //showMenu('sodexo', SodexoData.getDailyMenu('fi'));
  //showMenu('fazer', FazerData.getDailyMenu('fi'));
  /*
    fetchData(SodexoData.dataUrlDaily).then(data => {
      console.log('sodexo', data);
      const courses = SodexoData.parseDayMenu(data.courses);
      showMenu('sodexo',courses);
    });
  */

  fetchData(FazerData.dataUrlFi, 'fazer-php').then(data => {
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
    body: HSLData.getQueryForNextRidesByStopId(2132207)
  }).then(response => {
    // TODO: create separate render HSL data functions (in HSLData module maybe?)
    console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);
    const stop = response.data.stop;
    let time = new Date((stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000);
    document.querySelector('#hsl-data').innerHTML = `<p>
      Seuraava dösä pysäkiltä ${stop.name} on ${stop.stoptimesWithoutPatterns[0].headsign} ja saapuu
      ${time}
    </p>`;
  });

};

init();



