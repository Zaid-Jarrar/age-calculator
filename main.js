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
  } else if (inputField.name === "year") {
    errorLabel.textContent = "Must be in the past";
  } else {
    errorLabel.textContent = `Must be a vaild ${inputLabel.textContent}`;
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
 *  returns the days of the previous inputted month.
 * @param {string} year year inputted
 * @param {string} month month inputted
 * @param {string} day  day inputted
 */
function getDaysInMonth(year, month, day) {
  const pastDate = new Date(year, month - 1, day);
  pastDate.setUTCDate(0);
  return pastDate.getUTCDate();
}
/**
 * calculates the resulted difference between the present and the inputted date
 * @param {string} year year inputted
 * @param {string} month month inputted
 * @param {string} day  day inputted
 */
const calculateDifference = (year, month, day) => {
  const today = new Date();

  const diffYears = today.getFullYear() - year;
  let diffMonths = Math.abs(today.getMonth() + 1 - month);

  let diffDays = today.getDay() + 1 - day;

  if (diffDays < 0) {
    diffDays += getDaysInMonth(year, month, day);
    --diffMonths;
  }
  const errorMargin = 1;
  diffDays = diffDays - errorMargin;
  yearsResult.textContent = diffYears;
  monthsResult.textContent = diffMonths;
  daysResult.textContent = diffDays;
};

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
