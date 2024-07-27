import { classes } from "./TtsClasses.js";
mainStart()

function mainStart(){ // main function when start. adds a listener to the button
let inputDateElement = document.getElementById('date-input');
const updateDateBTN = document.querySelector(".js-update-date");
const inputWarnElement = document.querySelector(".js-input-date-warn");

updateDateBTN.addEventListener("click", () => { 
  if(inputDateElement.value){
    inputWarnElement.style.display = "none";
    updateHTML(inputDateElement.value);
    inputDateElement.value = '';
  } else {
    inputWarnElement.style.display = "block";
  }
});
}

function filterClasses(givenDate){ // filters and arranges the classes
  let date = new Date(givenDate);
  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  let dayOfTheWeek = weekDays[date.getDay()];
  let classesInCurrentDay = [];
  let finalClasses = [];

  classes.forEach( item => {
    item.weekdays.forEach(day => {
      if(day === dayOfTheWeek){
        classesInCurrentDay.push(item);
      }
    });
  });

  classesInCurrentDay.sort((a,b) => {
    return a.time - b.time;
  });

  classesInCurrentDay.forEach(item => {
    item.time = item.time.replace('.', ':');
  });

  classesInCurrentDay.forEach(item => {
    if (item.amPm === "A.M") {
      finalClasses.push(item);
    }
  });

  classesInCurrentDay.forEach(item => {
    if (item.amPm === "P.M") {
      finalClasses.push(item);
    }
  });

  return finalClasses;
}

function createHtml(classesArray){ // creates the html for subject-items using an array of subjects(given)
  let newHtml = ''; 
  classesArray.forEach( item => {
    newHtml += `
    <div class="class">
      <p class="class-name js-class-name">Subject: ${item.className}</p>
      <p class="class-teacher js-class-teacher">Professor: ${item.teacher}</p>
      <p class="class-time js-class-time">Time: ${item.time} ${item.amPm}</p>
    </div>
    `;
  });
  return newHtml;
}

function getDate( change, today, format) { // returns the date
  if(format == '1'){
    let dateWanted = new Date();
    let currentDate = new Date(today);
    dateWanted.setDate(currentDate.getDate() + change);
    let month = dateWanted.getMonth() + 1;
    return dateWanted.getFullYear() + '-' + month + '-' + dateWanted.getDate();
  } else if(format == '2') {
    let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'];
    let weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dateWanted = new Date(today);
    let currentDate = new Date(today);
    dateWanted.setDate(dateWanted.getDate() + change);
    return weekDay[dateWanted.getDay()] + ' ' + monthName[dateWanted.getMonth()] + ' ' + dateWanted.getDate();
  }
}

function updateHTML(currentDate) { // updates the html for the subjects and the dates.
  const prevDayContainer = document.querySelector(".js-day-1");
  const currentDayContainer = document.querySelector(".js-day-2");
  const nextDayContainer = document.querySelector(".js-day-3");
  const dateInfo1 = document.querySelector(".js-extra-info-date-1");
  const dateInfo2 = document.querySelector(".js-extra-info-date-2");
  const dateInfo3 = document.querySelector(".js-extra-info-date-3");

  prevDayContainer.innerHTML = createHtml(filterClasses(getDate( -1, currentDate, '1')));
  currentDayContainer.innerHTML = createHtml(filterClasses(currentDate));
  nextDayContainer.innerHTML = createHtml(filterClasses(getDate( 1, currentDate, '1')));
  dateInfo1.innerHTML = getDate(-1, currentDate, '2');
  dateInfo2.innerHTML = getDate( 0, currentDate, '2');
  dateInfo3.innerHTML = getDate( 1, currentDate, '2');
}