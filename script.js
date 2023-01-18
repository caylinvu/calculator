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
        operator = e.target.textContent;
        num1 = displayValue;
        isCompleteNumber = true;
        console.log(operator);
        console.log(num1);
        
        equalButton.addEventListener('click', function (e) {
            num2 = displayValue;
            console.log(num2);
            result = operate(operator, num1, num2);
            displayText.textContent = result;
        });
    });
});

