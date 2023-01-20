const displayText = document.querySelector('.display-text');
const equationText = document.querySelector('.equation');
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
    // console.log("num1 " + num1);
    // console.log("num2 " + num2);
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

function populateNumbers(e) {
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

numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => populateNumbers(e.target.textContent));
});

function isStar (operator) {
    if (operator == '*') return 'x';
    else return operator;
}

document.addEventListener('keydown', function (e) {
    if (e.key >= 0 && e.key <= 9) populateNumbers(e.key);
    
    if (e.key == '/' || e.key == '*' || e.key == '-' || e.key == '+') {
        isRepeatedEqual = false;
        if (!displayText.textContent) {
            displayText.textContent = '0';           
        }
        if (displayText.textContent == "Number is too big" || displayText.textContent == "Can't divide by 0") {
            displayText.textContent = '0';
            equationText.textContent = "0 " + isStar(e.key);

        }
        if (!isOperationLocked) {
            isFirstEquation = true;
            isSecondEquation = false;
        }
        if (isFirstEquation) {
            operator = isStar(e.key);
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
            operator = isStar(e.key);
            num1 = result;
            isOperationLocked = false;
        } else {
            num2 = Number(displayText.textContent);
            result = operate(operator, num1, num2);
            displayText.textContent = result;
            isCompleteNumber = true;
            operator = isStar(e.key);
            num1 = result;
            isOperationLocked = false;
        }
        console.log("num1 " + num1);
        console.log("num2 " + num2);
        console.log("operator " + operator);
        if (result == "Number is too big" || result == "Can't divide by 0") {
            equationText.textContent = '';
            isFirstEquation = true;
            isSecondEquation = false;
            result = '';
        } else equationText.textContent = num1 + " " + operator;
    }

    for (const button of numberButtons.values()) {
        if (e.key == button.id) {
            console.log(button.id);
            button.onclick = button.classList.add("active");
            document.addEventListener('keyup', function (e) {
                button.classList.remove("active");
            });
        }
    }
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
        isRepeatedEqual = false;
        if (!displayText.textContent) {
            displayText.textContent = '0';           
        }
        if (displayText.textContent == "Number is too big" || displayText.textContent == "Can't divide by 0") {
            displayText.textContent = '0';
            equationText.textContent = "0 " + e.target.textContent;

        }
        if (!isOperationLocked) {
            isFirstEquation = true;
            isSecondEquation = false;
        }
        if (isFirstEquation) {
            operator = e.target.textContent;
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
            operator = e.target.textContent;
            num1 = result;
            isOperationLocked = false;
        } else {
            num2 = Number(displayText.textContent);
            result = operate(operator, num1, num2);
            displayText.textContent = result;
            isCompleteNumber = true;
            operator = e.target.textContent;
            num1 = result;
            isOperationLocked = false;
        }
        console.log("num1 " + num1);
        console.log("num2 " + num2);
        console.log("operator " + operator);
        if (result == "Number is too big" || result == "Can't divide by 0") {
            equationText.textContent = '';
            isFirstEquation = true;
            isSecondEquation = false;
            result = '';
        } else equationText.textContent = num1 + " " + operator;
    });
});

equalButton.addEventListener('click', function (e) {
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
    equationText.textContent = '';
});

backspaceButton.addEventListener('click', () => {
    displayText.textContent = displayText.textContent.slice(0, (displayText.textContent.length - 1));
});

percentButton.addEventListener('click', () => {
    displayText.textContent = displayText.textContent / 100;
});

negateButton.addEventListener('click', () => {
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
});

decimalButton.addEventListener('click', () => {
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
});

// MAKE FUNCTIONS FOR ALL EVENT FUNCTIONS AND THEN ADD KEYBOARD SUPPORT AFTER, PASSING THOSE FUNCTIONS THROUGH

// add keyboard support for operators and other buttons

// figure out on click events

// fix issue where button stays selected when clicking then using keyboard after