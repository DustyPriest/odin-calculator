// Script for calculator webapp create as part of The Odin project course
// Author: DustyPriest

/* ------ GLOBAL VARIABLES ------ */

/* ------ ELEMENT SELECTORS ------ */

/* ------ EVENT LISTENERS ------ */

/* ------ LISTENER FUNCTIONS------ */

/* ------ ADDITIONAL FUNCTIONS ------ */

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
