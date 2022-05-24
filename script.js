// Script for calculator webapp create as part of The Odin project course
// Author: DustyPriest

/* ------ GLOBAL VARIABLES ------ */

const DEFAULT_DISPLAY = '0';

let mainDisplay = DEFAULT_DISPLAY;
let equationDisplay = [];
let equation = [];

/* ------ ELEMENT SELECTORS ------ */

const mainDisplayEl = document.querySelector('.main-display');
const equationDisplayEl = document.querySelector('.sub-display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');

/* ------ EVENT LISTENERS ------ */

digits.forEach((digit) => {
  digit.addEventListener('click', inputDigit);
});

operators.forEach((operator) => {
  operator.addEventListener('click', inputOperator);
});

/* ------ LISTENER FUNCTIONS------ */

function inputDigit(e) {
  // replace default display
  // or begin new number
  // or add to current number
  // if (mainDisplay[mainDisplay.length - 1] === DEFAULT_DISPLAY)
  //   mainDisplay[0] = e.target.textContent;
  // else if (isNaN(mainDisplay[mainDisplay.length - 1]))
  //   mainDisplay.push(e.target.textContent);
  // else mainDisplay[mainDisplay.length - 1] += e.target.textContent;

  if (mainDisplay === DEFAULT_DISPLAY || mainDisplay === '')
    mainDisplay = e.target.textContent;
  else mainDisplay += e.target.textContent;

  updateMainDisplay();
}

function inputOperator(e) {
  // add main display
  // remove current operator if one already selected
  // insert 0 if necessary
  // insert new operator
  // reset mainDisplay for next number
  if (mainDisplay !== '') equation.push(mainDisplay);
  if (isNaN(equation[equation.length - 1])) {
    equation.pop();
    if (equation.length === 0) equation.push('0');
  }

  equation.push(e.target.textContent);

  mainDisplay = '';
  updateEquationDisplay();
}

/* ------ ADDITIONAL FUNCTIONS ------ */

const updateMainDisplay = () => {
  mainDisplayEl.textContent = mainDisplay;
};

const updateEquationDisplay = () => {
  equationDisplayEl.textContent = equation.join(' ');
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
