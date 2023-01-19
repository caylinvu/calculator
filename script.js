const displayText = document.querySelector('.display-text');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equals');
const allClearButton = document.querySelector('.all-clear');
const clearButton = document.querySelector('.clear');
const percentButton = document.querySelector('.percent');
const negateButton = document.querySelector('.negate');

let displayValue = '0';
let num1 = '';
let num2 = '';
let operator = '';
let result = '';
let isCompleteNumber = false;
let isFirstEquation = true;
let isSecondEquation = false;
let isRepeatedEqual = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    }
}

function populateNumbers() {
    numberButtons.forEach((button) => {
        button.addEventListener('click', function (e) {
            if (isCompleteNumber) {
                displayText.textContent = '';
                displayValue = '0';
                isCompleteNumber = false;
            }
            if (displayValue.length < 14) {
                displayText.textContent += e.target.textContent;
                displayValue = displayText.textContent.toString();
            }
        });
    });
}

populateNumbers();

operatorButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
        isRepeatedEqual = false;
        if (isFirstEquation) {
            operator = e.target.textContent;
            num1 = Number(displayText.textContent);
            isCompleteNumber = true;
            isFirstEquation = false;
            isSecondEquation = true;
        } else if (isSecondEquation) {
            num2 = Number(displayText.textContent);
            result = operate(operator, num1, num2);
            displayText.textContent = result;
            isCompleteNumber = true;
            isSecondEquation = false;
            operator = e.target.textContent;
            num1 = result;
        } else {
            num2 = Number(displayText.textContent);
            result = operate(operator, num1, num2);
            displayText.textContent = result;
            isCompleteNumber = true;
            operator = e.target.textContent;
            num1 = result;
        }
    });
});

equalButton.addEventListener('click', function (e) {
    if (!isRepeatedEqual) {
        num2 = Number(displayText.textContent);
        result = operate(operator, num1, num2);
        displayText.textContent = result;
        isFirstEquation = true;
        isRepeatedEqual = true;
    } else if (isRepeatedEqual) {
        num1 = result;
        result = operate(operator, num1, num2);
        displayText.textContent = result;
    }

    isCompleteNumber = true;
});

allClearButton.addEventListener('click', () => {
    displayValue = '0';
    num1 = '';
    num2 = '';
    operator = '';
    result = '';
    isCompleteNumber = false;
    isFirstEquation = true;
    isSecondEquation = false;
    isRepeatedEqual = false;
    displayText.textContent = '';
});

clearButton.addEventListener('click', () => {
    displayText.textContent = displayText.textContent.slice(0, (displayText.textContent.length - 1));
});

percentButton.addEventListener('click', () => {
    displayText.textContent = displayText.textContent / 100;
});

// round results to 14 places

// display message if try to divide by 0

// fix issue if changing operator after typing first number

// add starting 0 if choosing operator first

// maybe fix issue with typing a number after hitting 0