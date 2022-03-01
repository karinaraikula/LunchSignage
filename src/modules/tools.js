/**
 * Today's date only in ISO format
 */
 const todayISODate = new Date().toISOString().split('T')[0];

 /**
  * TODO: add description
  *
  * @returns
  */
 const getTodayIndex = () => {
   // NOTE: doesn't work on Sundays
   // TODO: ^ fix it!
   const weekDayIndex = new Date().getDay() - 1;
   return weekDayIndex;
 };
 
 export {getTodayIndex, todayISODate};