let inputs = document.querySelectorAll("input");
let submitButton = document.getElementById("submitBtn");
let dayLabel = document.getElementById("day-label");
let dayInput = document.getElementById("day");
let errorDay = document.querySelector(".error-day");
let daysResult = document.getElementById("days-result");
let monthLabel = document.getElementById("month-label");
let monthInput = document.getElementById("month");
let errorMonth = document.querySelector(".error-month");
let monthsResult = document.getElementById("months-result");
let yearLabel = document.getElementById("year-label");
let yearInput = document.getElementById("year");
let errorYear = document.querySelector(".error-year");
let yearsResult = document.getElementById("years-result");

const inputValues = { day: "", month: "", year: "" };

const setInputValues = (e) => {
  inputValues[e.target.name] = Number(e.target.value);
};

// Invalid
const setInvalidInputStyle = (inputLabel, inputField, errorLabel) => {
  inputLabel.style.color = "hsl(0, 100%, 67%)";
  inputField.style.border = "2px solid hsl(0, 100%, 67%)";

  if (inputField.value === "") {
    errorLabel.textContent = "This field is required";
  } else {
    errorLabel.textContent = `must be a vaild ${inputLabel.textContent}`;
  }
  errorLabel.style.display = "block";
};

// Valid
const setValidInputStyle = (inputLabel, inputField, errorLabel) => {
  inputLabel.style.color = "hsl(0, 1%, 44%)";
  inputField.style.border = "2px solid hsl(0, 0%, 86%)";
  errorLabel.style.display = "none";
};

// Validators
const isValidYear = (year) => {
  if (year === "") {
    return "";
  }
  const currentYear = new Date().getFullYear();
  return year <= currentYear && year > 0;
};

const isValidMonth = (month) => {
  if (month === "") {
    return "";
  }
  return month <= 12 && month > 0;
};

const isValidDay = (day, month, year) => {
  if (day === "") {
    return "";
  }

  const lastDay = new Date(year, month, 0).getDate();
  return day > 0 && day <= lastDay;
};

/**
 * calculates the resulted difference between the present and the inputted date
 * @param {string} year year inputted
 * @param {string} month month inputted
 * @param {string} day  day inputted
 */
// const calculateDifference = (year, month, day) => {
//   const pastDate = new Date(year, month - 1, day);
//   const today = new Date();

//   // Date class calculates to if year is equal or larger than 100 years, with regard to Gregorian calendar.
//   // add below to calculate anything below 100
//   let diffYears;
//   if (year < 100) {
//     diffYears = today.getFullYear() - year;
//   } else {
//     diffYears = today.getFullYear() - pastDate.getFullYear();
//   }

//   let diffMonths = today.getMonth() - pastDate.getMonth();
//   let diffDays = today.getDate() - pastDate.getDate();
//   if (diffMonths < 0 || (diffMonths === 0 && diffDays < 0)) {
//     console.log("here");
//     diffYears--;
//     diffMonths += 12;
//   }
//   if (diffDays < 0) {
//     const daysInPreviousMonth = new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       0
//     ).getDate();
//     diffDays += daysInPreviousMonth;
//   }

//   yearsResult.textContent = diffYears;
//   monthsResult.textContent = diffMonths;
//   daysResult.textContent = diffDays;
// };

const calculateDifference = (year, month, day) => {
  const pastDate = new Date(year, month - 1, day);
  const today = new Date();
  const millisecondsPerDay = 86400000;
  const millisecondsPerYear = 31536000000;
  const millisecondsPerMonth = 2592000000;

  const diffMilliseconds = today.getTime() - pastDate.getTime();

  let diffYears;
  if (year < 100) {
    diffYears = today.getFullYear() - year;
  } else {
    diffYears = Math.floor(diffMilliseconds / millisecondsPerYear);
  }
  let diffMonths = Math.floor(
    (diffMilliseconds % millisecondsPerYear) / millisecondsPerMonth
  );
  // console.log(--diffMonths);

  let diffDays = today.getDate() - pastDate.getDate();

  // let diffDays = Math.floor(
  //   (diffMilliseconds % millisecondsPerMonth) / millisecondsPerDay
  // );

  if (diffMonths < 0 || (diffMonths === 0 && diffDays < 0)) {
    console.log("here");
    diffYears--;
    diffMonths += 12;
  }
  // if (diffDays === 0) {
  //   console.log("mont");
  //   --diffMonths 
  // } 
  if (diffDays < 0) {
    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    diffDays += daysInPreviousMonth;
  }
  yearsResult.textContent = diffYears;
  monthsResult.textContent = diffMonths;
  daysResult.textContent = diffDays;
  console.log(diffYears, diffMonths, diffDays);
};
calculateDifference(100, 2, 1);

// collects inputted data
const setInputEvents = () => {
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      setInputValues(e);
    });
  });
};
// Checks the validation of the date, then set appropriate styles.
const setSubmitButtonEvent = () => {
  submitButton.addEventListener("click", () => {
    const year = isValidYear(inputValues.year);
    const month = isValidMonth(inputValues.month);
    const day = isValidDay(
      inputValues.day,
      inputValues.month,
      inputValues.year
    );
    setStylesOnSubmit(day, month, year);
  });
};

const setStylesOnSubmit = (day, month, year) => {
  if (!day || !month || !year) {
    yearsResult.textContent = "--";
    monthsResult.textContent = "--";
    daysResult.textContent = "--";
  }
  if (!day) {
    setInvalidInputStyle(dayLabel, dayInput, errorDay);
  } else {
    setValidInputStyle(dayLabel, dayInput, errorDay);
  }

  if (!month) {
    setInvalidInputStyle(monthLabel, monthInput, errorMonth);
  } else {
    setValidInputStyle(monthLabel, monthInput, errorMonth);
  }

  if (!year) {
    setInvalidInputStyle(yearLabel, yearInput, errorYear);
  } else {
    setValidInputStyle(yearLabel, yearInput, errorYear);
  }

  if (day && month && year) {
    calculateDifference(inputValues.year, inputValues.month, inputValues.day);
  }
};
setInputEvents();
setSubmitButtonEvent();
