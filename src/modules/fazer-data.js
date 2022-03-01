const today = new Date().toISOString().split('T')[0];
console.log('today is ',today);

const dataUrlFi = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=${today}`;
const dataUrlEn = `https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=${today}`;

/**
 * Päivittäinen fazer menu
 *
 */
const parseDayMenu = (lunchMenus, dayOfWeek) => {
  let dayMenu = lunchMenus[dayOfWeek].SetMenus.map(setMenu => {
    let name = setMenu.Name;
    let meals = '';
    for (const meal of setMenu.Meals) {
      meals += meal.Name + ', ';
    }
    return name ? name + ': ' + meals : meals;
  });
  return dayMenu;

};

/*
const getDailyMenu = (lang, weekDay = 0) => {
  return (lang === 'fi') ?
  parseDayMenu(FazerLunchMenuFi, weekDay):parseDayMenu(FazerLunchMenuEn, weekDay);
};
*/
const FazerData = { parseDayMenu, dataUrlFi, dataUrlEn };
export default FazerData;

/*

  let dishes = setMenu.Meals.map(dish => `${dish.Name} (${dish.Diets.join(', ')})`);
    dishes = dishes.join(', ');
    return mealName ? `${mealName}: ${dishes}` : dishes;
  });
  return dayMenu;

  */