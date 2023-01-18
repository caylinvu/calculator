const displayText = document.querySelector('.display-text');
const numberButtons = document.querySelectorAll('.number');
let displayValue = '0';

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
            if (displayValue.length < 14) {
                displayText.textContent += e.target.textContent;
                displayValue = displayText.textContent.toString();
            }
        });
    });
}

populateNumbers();