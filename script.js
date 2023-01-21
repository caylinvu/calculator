const displayText = document.querySelector('.display-text');
const equationText = document.querySelector('.equation');
const allButtons = document.querySelectorAll('button');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equals');
const allClearButton = document.querySelector('.all-clear');
const backspaceButton = document.querySelector('.backspace');
const percentButton = document.querySelector('.percent');
const negateButton = document.querySelector('.negate');
const decimalButton = document.querySelector('.decimal');

let displayValue = '0';
let num1 = '';
let num2 = '';
let operator = '';
let result = '';
let isCompleteNumber = false;
let isFirstEquation = true;
let isSecondEquation = false;
let isRepeatedEqual = false;
let isOperationLocked = true;

function add(num1, num2) {
    return roundResult(num1 + num2);
}

function subtract(num1, num2) {
    return roundResult(num1 - num2);
}

function multiply(num1, num2) {
    return roundResult(num1 * num2);
}

function divide(num1, num2) {
    return roundResult(num1 / num2);
}

function roundResult(number) {
    finalResult = Math.round(number * 1000) / 1000;
    stringResult = finalResult.toString();
    if (stringResult.length > 14) return 'Number is too big';
    return finalResult;
}

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        if (num2 == '0') return "Can't divide by 0";
        return divide(num1, num2);
    }
}

function isStar (operator) {
    if (operator == '*') return 'x';
    else return operator;
}

function pressNumbers(e) {
    isOperationLocked = true;
    if (isCompleteNumber) {
        displayText.textContent = '';
        displayValue = '0';
        isCompleteNumber = false;
    }
    if (displayValue.length < 14) {
        if (displayText.textContent == '-0') {
            displayText.textContent = `-${e}`;
        } else if (displayText.textContent == '0') {
            displayText.textContent = e;
        } else {
            displayText.textContent += e;
            displayValue = displayText.textContent.toString();
        }
    }
}

function pressOperators(e) {
    isRepeatedEqual = false;
    if (!displayText.textContent) {
        displayText.textContent = '0';           
    }
    if (displayText.textContent == "Number is too big" || displayText.textContent == "Can't divide by 0") {
        displayText.textContent = '0';
        equationText.textContent = "0 " + isStar(e);

    }
    if (!isOperationLocked) {
        isFirstEquation = true;
        isSecondEquation = false;
    }
    if (isFirstEquation) {
        operator = isStar(e);
        num1 = Number(displayText.textContent);
        isCompleteNumber = true;
        isFirstEquation = false;
        isSecondEquation = true;
        isOperationLocked = false;
    } else if (isSecondEquation) {
        num2 = Number(displayText.textContent);
        result = operate(operator, num1, num2);
        displayText.textContent = result;
        isCompleteNumber = true;
        isSecondEquation = false;
        operator = isStar(e);
        num1 = result;
        isOperationLocked = false;
    } else {
        num2 = Number(displayText.textContent);
        result = operate(operator, num1, num2);
        displayText.textContent = result;
        isCompleteNumber = true;
        operator = isStar(e);
        num1 = result;
        isOperationLocked = false;
    }
    if (result == "Number is too big" || result == "Can't divide by 0") {
        equationText.textContent = '';
        isFirstEquation = true;
        isSecondEquation = false;
        result = '';
    } else equationText.textContent = num1 + " " + operator;
}

function pressEquals() {
    if (isFirstEquation) return;
    if (!isRepeatedEqual) {
        num2 = Number(displayText.textContent);
        result = operate(operator, num1, num2);
        displayText.textContent = result;
        let tempNum2 = num2.toString();
        if (result == "Number is too big" || result == "Can't divide by 0") {
            equationText.textContent = '';
            result = '';
        } else if (tempNum2.includes("-")) {
            equationText.textContent += " (" + num2 + ") =";
        } else equationText.textContent += " " + num2 + " =";
    } 
    isFirstEquation = true;
    isSecondEquation = false;
    isRepeatedEqual = true;
    isCompleteNumber = true;
}

function pressClear() {
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
    equationText.textContent = '';
}

function pressBackspace() {
    displayText.textContent = displayText.textContent.slice(0, (displayText.textContent.length - 1));
}

function pressPercent() {
    displayText.textContent = displayText.textContent / 100;
}

function pressNegate() {
    if (!displayText.textContent || displayText.textContent == '0') {
        displayText.textContent = '-0';
        isCompleteNumber = false;
    } else if (displayText.textContent == '-') {
        displayText.textContent = '0';
    } else if (isCompleteNumber && isFirstEquation) {
        displayText.textContent = -(displayText.textContent);
    } else if (isCompleteNumber && !isFirstEquation) {
        displayText.textContent = '-0';
        isCompleteNumber = false;
    } else if (displayText.textContent) {
        displayText.textContent = -(displayText.textContent);
    }
}

function pressDecimal() {
    if (!isCompleteNumber) {
        if (!displayText.textContent.includes('.')) {
            if (!displayText.textContent) {
                displayText.textContent = "0.";
            } else {
                displayText.textContent += '.';
            }
        }
    } else if (isCompleteNumber) {
        displayText.textContent = "0.";
        isCompleteNumber = false;
    }
}

numberButtons.forEach((button) => button.addEventListener('click', (e) => pressNumbers(e.target.textContent)));
operatorButtons.forEach((button) => button.addEventListener('click', (e) => pressOperators(e.target.textContent)));
equalButton.addEventListener('click', pressEquals);
allClearButton.addEventListener('click', pressClear);
backspaceButton.addEventListener('click', pressBackspace);
percentButton.addEventListener('click', pressPercent);
negateButton.addEventListener('click', pressNegate);
decimalButton.addEventListener('click', pressDecimal);
document.addEventListener('keydown', function (e) {
    if (e.key >= 0 && e.key <= 9) pressNumbers(e.key);
    if (e.key == '/' || e.key == '*' || e.key == '-' || e.key == '+') pressOperators(e.key);
    if (e.key == 'Enter') pressEquals();
    if (e.key == 'Backspace') pressBackspace();
    if (e.key == '.') pressDecimal();
    for (const button of allButtons.values()) {
        if (e.key == button.id) {
            console.log(button.id);
            button.onclick = button.classList.add("active");
            document.addEventListener('keyup', function (e) {
                button.classList.remove("active");
            });
        }
    }
});

// fix issue where button stays selected when clicking then using keyboard after

// finish cleaning up code