import FazerData from './modules/fazer-data';
import { fetchData } from './modules/network';
import { getTodayIndex } from './modules/tools';

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


const init = () => {
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

  document.querySelector('#switch-lang').addEventListener('click', changeLanguage);
  
};

init();



