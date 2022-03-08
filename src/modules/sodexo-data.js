import { todayISODate } from "./tools";

const sodexoMyrtsiDataUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${todayISODate}`;
const sodexoMyllyDataUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/158/${todayISODate}`;


/**
 * Extract course titles from Sodexo menu JSON object
 *
 * @param {string} menu - JSON Menu to be parsed
 * @param {string} lang - ui language
 * @returns {Array} daily menu
 */
const parseDayMenu = (menu, lang) => {
  const courses = Object.values(menu);
  let dailyMenu = [];
  for (const course of courses) {
    if (!lang == 'fi') {
      dailyMenu.push(course.title_en + ', ' + course.dietcodes);
    } else {
      dailyMenu.push(course.title_fi + ', ' + course.dietcodes + ', ' + course.price);
    }
  }
  return dailyMenu;
};

const SodexoData = { sodexoMyrtsiDataUrl, sodexoMyllyDataUrl, parseDayMenu };
export default SodexoData;