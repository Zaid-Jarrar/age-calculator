let input = document.querySelectorAll("input");
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

const setInvalidInputStyle = (inputLabel, inputField, errorLabel) => {
  inputLabel.style.color = "hsl(0, 100%, 67%)";
  inputField.style.border = "2px solid hsl(0, 100%, 67%)";
  console.log("input", inputField.value);

  if (inputField.value === "") {
    errorLabel.textContent = "This field is required";
  } else {
    errorLabel.textContent = `must be a vaild ${inputLabel.textContent}`;
  }
  errorLabel.style.opacity = 1;
};

const setValidInputStyle = (inputLabel, inputField, errorLabel) => {
  inputLabel.style.color = "hsl(0, 1%, 44%)";
  inputField.style.border = "2px solid hsl(0, 0%, 86%)";
  console.log("input", inputField.value);

  errorLabel.style.opacity = 0;
};

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

const isValidDay = (year, month, day) => {
  if (day === "") {
    return "";
  }
  var lastDay = new Date(year, month, 0).getDate();
  return day > 0 && day <= lastDay;
};

const calculateDifference = (year, month, day) => {
  const pastDate = new Date(year, month, day);
  const today = new Date();
  const diffMilliseconds = today - pastDate;
  const diffYears = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24 * 365));
  const diffMonths = Math.floor(
    (diffMilliseconds % (1000 * 60 * 60 * 24 * 365)) /
      (1000 * 60 * 60 * 24 * 30)
  );
  const diffDays = Math.floor(
    (diffMilliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  yearsResult.textContent = diffYears;
  monthsResult.textContent = diffMonths;
  daysResult.textContent = diffDays;
};

const setInputEvents = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      setInputValues(e);
    });
  });
};

const setSubmitButtonEvent = () => {
  const submitButton = document.getElementById("submitBtn");
  submitButton.addEventListener("click", () => {
    const validYear = isValidYear(inputValues.year);
    const validMonth = isValidMonth(inputValues.month);
    const validDay = isValidDay(
      inputValues.year,
      inputValues.month,
      inputValues.day
    );

    if (!validDay) {
      setInvalidInputStyle(dayLabel, dayInput, errorDay);
    } else {
      setValidInputStyle(dayLabel, dayInput, errorDay);
    }

    if (!validMonth) {
      setInvalidInputStyle(monthLabel, monthInput, errorMonth);
    } else {
      setValidInputStyle(monthLabel, monthInput, errorMonth);
    }

    if (!validYear) {
      setInvalidInputStyle(yearLabel, yearInput, errorYear);
    } else {
      setValidInputStyle(yearLabel, yearInput, errorYear);
    }

    if (validDay && validMonth && validYear) {
      calculateDifference(
        inputValues.year,
        inputValues.month - 1,
        inputValues.day
      );
    }
  });
};

setInputEvents();
setSubmitButtonEvent();
