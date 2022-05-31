// Script for calculator webapp create as part of The Odin project course
// Author: DustyPriest

// TODO: keyboard support

/* ------ GLOBAL VARIABLES ------ */

const DEFAULT_DISPLAY = '0';
const MAX_DECIMALS = 10;

let mainDisplay = DEFAULT_DISPLAY;
let equation = [];
let result;
let errorOccurred = false;
let equalsPressed = false;

/* ------ ELEMENT SELECTORS ------ */

const mainDisplayEl = document.querySelector('.main-display');
const equationDisplayEl = document.querySelector('.sub-display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const decimal = document.querySelector('#decimal');

/* ------ EVENT LISTENERS ------ */

digits.forEach((digit) => {
  digit.addEventListener('click', inputDigit);
});

operators.forEach((operator) => {
  operator.addEventListener('click', inputOperator);
});

equals.addEventListener('click', handleEquals);

clear.addEventListener('click', clearCalculator);

decimal.addEventListener('click', inputDecimal);

backspace.addEventListener('click', handleBackspace);

/* ------ LISTENER FUNCTIONS------ */

function inputDigit(e) {
  // replace default display / begin new number
  // or add to current number
  if (equalsPressed) {
    return;
  }

  // maybe have display error system to prevent bad inputs?
  // if (mainDisplay.length === 26) {
  //   displayError('Maximum number length reached');
  //   return;
  // }

  if (mainDisplay === DEFAULT_DISPLAY || mainDisplay === '')
    mainDisplay = e.target.textContent;
  else mainDisplay += e.target.textContent;

  updateMainDisplay();
}

function inputOperator(e) {
  // add main display to equation
  // remove current operator if one already selected
  // insert 0 if necessary
  // insert new operator
  // reset mainDisplay for next number
  if (equalsPressed) {
    equalsPressed = false;
    toggleDisableButtons();
  }

  if (mainDisplay !== '') equation.push(mainDisplay);

  if (isNaN(equation[equation.length - 1])) {
    equation.pop();
    if (equation.length === 0) equation.push('0');
  }

  equation.push(e.target.textContent);

  mainDisplay = '';
  updateEquationDisplay();
}

function handleEquals(e) {
  // to be run when = pressed
  // if trailing operater, remove then assess
  // if empty expression return nothing or display zero
  // if divide by zero return error of some kind (perhaps check this during actual division step, so that entering decimals < 1 is not impeded)
  // otherwise operate in correct order

  inputOperator(e);
  // if empty expression or solo number
  if (equation.length !== 2) {
    const ops = ['×', '÷', '+', '−'];

    ops.forEach(operate);

    if (errorOccurred) {
      resetCalc();
      errorOccurred = false;
    } else {
      result = equation[0];
      resetCalc();

      // round to 10 decimal places
      if (result % 1 !== 0) {
        result = +(
          Math.round(result + `e+${MAX_DECIMALS}`) + `e-${MAX_DECIMALS}`
        );
      }

      mainDisplay = result;
      updateMainDisplay();
    }
  }

  equalsPressed = true;
  toggleDisableButtons();
}

function clearCalculator() {
  resetCalc();
  equation = [];
  updateMainDisplay();
  updateEquationDisplay();
  equalsPressed = false;
  enableButtons();
}

function inputDecimal() {
  if (equalsPressed || mainDisplay.includes('.')) {
    return;
  }

  if (mainDisplay === '') {
    mainDisplay = '0.';
  } else {
    mainDisplay += '.';
  }

  updateMainDisplay();
}

function handleBackspace() {
  // return if displaying result or nothing to delete
  if (equalsPressed || (mainDisplay === '' && equation.length === 0)) {
    return;
  }

  if (mainDisplay !== '') {
    //edit current number
    mainDisplay = mainDisplay.slice(0, -1);
  } else if (isNaN(equation[equation.length - 1])) {
    //remove operator
    equation.pop();
  } else {
    // edit previous number from equation
    mainDisplay = `${equation[equation.length - 1]}`.slice(0, -1);
    equation.pop();
  }

  updateEquationDisplay();
  updateMainDisplay();
}

/* ------ GENERAL FUNCTIONS ------ */

const updateMainDisplay = () => {
  mainDisplayEl.textContent = mainDisplay;
  // mainDisplay === '' ? DEFAULT_DISPLAY : mainDisplay;
};

const updateEquationDisplay = () => {
  equationDisplayEl.textContent =
    equation.join(' ') === '0' ? '' : equation.join(' ');
};

const operate = (op) => {
  const regex = new RegExp(`\\${op}`); // double escape char required for regex special character +
  while (regex.test(equation.join(''))) {
    const index = equation.indexOf(op);

    let stepResult;
    switch (op) {
      case '×':
        stepResult = +equation[index - 1] * +equation[index + 1];
        break;
      case '÷':
        if (equation[index + 1] === '0') {
          mainDisplayEl.textContent = 'Cannot divide by 0';
          errorOccurred = true;
          return; // not the best efficient as will still assess addition and subtraction afterwards
        }
        stepResult = +equation[index - 1] / +equation[index + 1];
        break;
      case '+':
        stepResult = +equation[index - 1] + +equation[index + 1];
        break;
      case '−':
        stepResult = +equation[index - 1] - +equation[index + 1];
        break;
    }
    // replace used numbers with stepResult
    equation.splice(index - 1, 3, stepResult);
  }
};

const resetCalc = () => {
  equation = [];
  mainDisplay = DEFAULT_DISPLAY;
};

const toggleDisableButtons = () => {
  if (backspace.classList.contains('disabled')) {
    backspace.classList.remove('disabled');
    decimal.classList.remove('disabled');
    digits.forEach((digit) => digit.classList.remove('disabled'));
  } else {
    backspace.classList.add('disabled');
    decimal.classList.add('disabled');
    digits.forEach((digit) => digit.classList.add('disabled'));
  }
};

const enableButtons = () => {
  backspace.classList.remove('disabled');
  decimal.classList.remove('disabled');
  digits.forEach((digit) => digit.classList.remove('disabled'));
};

updateMainDisplay();
