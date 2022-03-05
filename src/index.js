import FazerData from './modules/fazer-data';
import { fetchData } from './modules/network';
import { getTodayIndex } from './modules/tools';
import HSLData from './modules/hsl-data';

let lang = 'fi';

/**
 * Järjestä lista aakkosjärjestyksessä
 */
const sortCourses = (courses, order = 'asc') => {
  let sortedMenu = courses.sort();
  if (order === 'desc') {
    sortedMenu.reverse();
  }
  return sortedMenu;
};

/**
 * Lataa menun etusivulle
 */
const showMenu = (restaurant, menu) => {
  const list = document.querySelector('#' + restaurant);
  list.innerHTML = '';
  for (const item of menu) {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  }
};

/**
 * Satunnainen annos
 */
const randomCourse = courses => {
  const randomIndex = Math.floor(Math.random() * courses.length);
  return courses[randomIndex];
};
const displayRandomCourse = () => {
  alert('Sodexo: ' + randomCourse(SodexoData.getDailyMenu(lang)) + '\n' + 'Fazer: ' + randomCourse(FazerData.getDailyMenu(lang)));
};

/**
 * Vaihda kieli
 */
const changeLanguage = () => {
  if (lang === 'fi') {
    lang = 'en';
  } else {
    lang = 'fi';
  }
  showMenu('sodexo', SodexoData.getDailyMenu(lang));
  showMenu('fazer', FazerData.getDailyMenu(lang));
};

/**
 * Function for showing sorted menu
 */
const renderSortedMenu = () => {
  showMenu('sodexo', sortCourses(SodexoData.getDailyMenu(lang)));
  showMenu('fazer', sortCourses(FazerData.getDailyMenu(lang)));
};

/**
 * Display pages/vies in carousel mode
 *
 * @param {number} activeView - view index to be displayed
 * @param {number} duration - seconds between page updated
 */
 const createViewCarousel = (activeView, duration) => {
  const views = document.querySelectorAll('section');
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
    showMenu('fazer', courses);
  });

  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/graphql'},
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



