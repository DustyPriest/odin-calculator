// Script for calculator webapp create as part of The Odin project course
// Author: DustyPriest

/* ------ GLOBAL VARIABLES ------ */

const DEFAULT_DISPLAY = '0';

let mainDisplay = DEFAULT_DISPLAY;
let subDisplay = '';

/* ------ ELEMENT SELECTORS ------ */

const mainDisplayEl = document.querySelector('.main-display');
const subDuisplayEl = document.querySelector('.sub-display');
const digits = document.querySelectorAll('.digit');

/* ------ EVENT LISTENERS ------ */

digits.forEach((digit) => {
  digit.addEventListener('click', storeDisplay);
});

/* ------ LISTENER FUNCTIONS------ */

function storeDisplay(e) {
  mainDisplay === '0'
    ? (mainDisplay = e.target.textContent)
    : (mainDisplay = mainDisplay + e.target.textContent);

  updateMainDisplay();
}

/* ------ ADDITIONAL FUNCTIONS ------ */

const updateMainDisplay = () => {
  mainDisplayEl.textContent = mainDisplay;
};

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  // TODO: address dividing by 0
  return a / b;
};

// FIXME: How should operate function work?
// FIXME: is display update called within operate?
const operate = (operator, a, b) => {
  switch (operator) {
    case '+':
      return add(a, b);
      break;
    case '-':
      return subtract(a, b);
      break;
    case '*':
      return multiply(a, b);
      break;
    case '/':
      return divide(a, b);
      break;
    default:
      return 0;
  }
};

updateMainDisplay();
