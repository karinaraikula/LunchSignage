import { todayISODate } from "./tools";

const dataUrlDaily = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${todayISODate}`;
const dataUrlWeekly = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/152';
//myllypuro 158
/**
 * Extract course titles from Sodexo menu JSON object
 *
 * @param {string} menu - JSON Menu to be parsed
 * @param {string} lang - ui language
 *
 * @returns {Array} daily menu
 */
const parseDayMenu = (menu, lang = 'fi') => {
  const courses = Object.values(menu);
  let dailyMenu = [];
  for (const course of courses) {
    if (lang === 'en') {
      dailyMenu.push(course.title_en + ', ' + course.dietcodes);
    } else {
      dailyMenu.push(course.title_fi + ', ' + course.dietcodes + ', ' + course.price);
    }
  }
  return dailyMenu;
};

const SodexoData = { dataUrlDaily, dataUrlWeekly, parseDayMenu };
export default SodexoData;