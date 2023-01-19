const displayText = document.querySelector('.display-text');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equals');
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
            console.log(num1);
            console.log(operator);
        } else if (isSecondEquation) {
            num2 = Number(displayText.textContent);
            console.log(num2);
            result = operate(operator, num1, num2);
            console.log(result);
            displayText.textContent = result;
            isCompleteNumber = true;
            isSecondEquation = false;
            operator = e.target.textContent;
            num1 = result;
        } else {
            num2 = Number(displayText.textContent);
            console.log("num1: " + num1);
            console.log("num2: " + num2);
            console.log(operator);
            result = operate(operator, num1, num2);
            displayText.textContent = result;
            isCompleteNumber = true;
            operator = e.target.textContent;
            console.log(operator);
            num1 = result;
        }
    });
});

equalButton.addEventListener('click', function (e) {
    if (!isRepeatedEqual) {
        console.log(num1);
        num2 = Number(displayText.textContent);
        console.log(num2);
        result = operate(operator, num1, num2);
        displayText.textContent = result;
        console.log(result);
        isFirstEquation = true;
        isRepeatedEqual = true;
    } else if (isRepeatedEqual) {
        num1 = result;
        result = operate(operator, num1, num2);
        displayText.textContent = result;
    }

    //isCompleteNumber = true;
});