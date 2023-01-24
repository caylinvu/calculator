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
let maxLength = 14;
let isCompleteNumber = false;
let isFirstEquation = true;
let isRepeatedEqual = false;
let isOperationLocked = true;

// operation functions
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

// round decimals or display 'Number is too big' if over 14 numbers
function roundResult(number) {
    finalResult = Math.round(number * 1000) / 1000;
    stringResult = finalResult.toString();
    if (stringResult.length > maxLength) {
        return 'Number is too big';
    }
    return finalResult;
}

// choose correct operation function and return result
function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            tempResult = add(num1, num2);
            break;
        case '-':
            tempResult = subtract(num1, num2);
            break;
        case 'x':
            tempResult = multiply(num1, num2);
            break;
        case '/':
            if (num2 == '0') {
                return "Can't divide by 0";
            }
            tempResult = divide(num1, num2);
            break;
    }
    return roundResult(tempResult);
}

// use 'x' as operator if user enters '*' on keyboard
function isStar (operator) {
    if (operator == '*') {
        return 'x';
    }
    return operator;
}

// unfocus buttons after clicking on them with mouse (so that pressing enter on the keyboard won't click them again)
function unfocusInput() {
    allButtons.forEach((button) => button.blur());
}

// populate numbers depending on previous display values and calculations
function populateNumbers(e) {
    isOperationLocked = true;

    // if a complete number was previously entered, delete the number before populating new number
    if (isCompleteNumber) {
        displayText.textContent = '';
        displayValue = '0';
        isCompleteNumber = false;
    }

    // populate numbers on display when clicked
    if (displayValue.length < maxLength) {
        switch(displayText.textContent) {
            case '-0': 
                displayText.textContent = `-${e}`;
                break;
            case '0':
                displayText.textContent = e;
                break;
            default:
                displayText.textContent += e;
                displayValue = displayText.textContent.toString();
                break;
        }
    }

    unfocusInput();
}

// populate operators depending on previous display values and calculations
function populateOperators(e) {
    isRepeatedEqual = false;

    // if operator button is clicked first before a number, populate '0' to the display
    if (!displayText.textContent) {
        displayText.textContent = '0';           
    }

    // if previous result gave error, start over and populate '0' to the display if an operator is clicked next
    if (displayText.textContent == "Number is too big" || displayText.textContent == "Can't divide by 0") {
        displayText.textContent = '0';
        equationText.textContent = "0 " + isStar(e);
    }

    // if an operation button is clicked again after already choosing an operator, switch the operation to the new one instead of running a calculation
    if (!isOperationLocked) {
        isFirstEquation = true;
    }

    // assign values to num1 and num2 and calculate result (accounts for continuous calculations without pressing equal sign)
    if (isFirstEquation) {
        operator = isStar(e);
        num1 = Number(displayText.textContent);
        isCompleteNumber = true;
        isFirstEquation = false;
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

    // populate the equation text at the top of the display depending on new result
    if (result == "Number is too big" || result == "Can't divide by 0") {
        equationText.textContent = '';
        isFirstEquation = true;
        result = '';
    } else {
        equationText.textContent = num1 + " " + operator;
    }

    unfocusInput();
}

// calculate values (used when equal sign is clicked)
function calculate() {
    // if equal sign is pressed after only entering one number, don't run any code
    if (isFirstEquation) {
        return;
    }

    // if equal sign is pressed assign num2 and calculate result (won't allow equal sign to repeatedly be clicked after performing a calculation)
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
        } else {
            equationText.textContent += " " + num2 + " =";
        }
    } 

    isFirstEquation = true;
    isRepeatedEqual = true;
    isCompleteNumber = true;
    unfocusInput();
}

// clear all values and set variables to default
function clear() {
    displayValue = '0';
    num1 = '';
    num2 = '';
    operator = '';
    result = '';
    isCompleteNumber = false;
    isFirstEquation = true;
    isRepeatedEqual = false;
    displayText.textContent = '';
    equationText.textContent = '';
    unfocusInput();
}

// delete last number on display (used when backspace is clicked)
function deleteNumber() {
    // clear all variables if backspace on error
    if (displayText.textContent == "Number is too big" || displayText.textContent == "Can't divide by 0") {
        clear();
        return;
    }

    // delete the last number in the string on the display
    displayText.textContent = displayText.textContent.slice(0, (displayText.textContent.length - 1));
    displayValue = displayText.textContent.toString();
    unfocusInput();
}

// convert number on the display to a percentage depending on current display value
function addPercentage() {
    // start over with '0' if pressed after error
    if (displayText.textContent == "Number is too big" || displayText.textContent == "Can't divide by 0") {
        clear();
        displayText.textContent = '0';
        return;
    }

    // convert the number on the display to a percentage OR display 'Number is too big' if greater than 14 #'s
    let tempPercent = displayText.textContent / 100;
    displayValue = tempPercent.toString();
    if (displayValue.length > maxLength) {
        displayText.textContent = "Number is too big";
        equationText.textContent = '';
        isCompleteNumber = true;
        isFirstEquation = true;
    } else {
        displayText.textContent = tempPercent;
    }
    unfocusInput();
}

// convert number on the display to postive/negative number depending on current display value
function addNegation() {
    // start over with '-0' if pressed after error
    if (displayText.textContent == "Number is too big" || displayText.textContent == "Can't divide by 0") {
        clear();
        displayText.textContent = '-0';
        return;
    }

    // toggle the number on the display between a positive and negative number
    if (!displayText.textContent || displayText.textContent == '0') {
        displayText.textContent = '-0';
        isCompleteNumber = false;
    } else if (displayText.textContent == '0.') {
        displayText.textContent = '-0.';
    } else if (displayText.textContent.endsWith('.')) {
        displayText.textContent = -(displayText.textContent) + ".";
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
    unfocusInput();
}

// add decimal point to number on display value
function addDecimal() {
    // start over with '0.' if pressed after error
    if (displayText.textContent == "Number is too big" || displayText.textContent == "Can't divide by 0") {
        clear();
        displayText.textContent = '0.';
        return;
    }

    // populates a decimal when button is pressed
    // if a complete number was previously entered, populates a new number starting with "0."
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
    unfocusInput();
}

// code to run when a button is pressed on the keyboard
function pressKeyboard(e) {
    // runs appropriate function depending on which button was pressed
    if (e >= 0 && e <= 9) {
        populateNumbers(e);
    }
    if (e == '/' || e == '*' || e == '-' || e == '+') {
        populateOperators(e);
    }
    if (e == 'Enter') {
     calculate();
    }
    if (e == 'Backspace') {
        deleteNumber();
    }
    if (e == '.') {
        addDecimal();
    }

    // adds button clicking animation when button is pressed on keyboard
    for (const button of allButtons.values()) {
        if (e == button.id) {
            button.onclick = button.classList.add("active");
            document.addEventListener('keyup', () => button.classList.remove("active"));
        }
    }
}

numberButtons.forEach((button) => button.addEventListener('click', (e) => populateNumbers(e.target.textContent)));
operatorButtons.forEach((button) => button.addEventListener('click', (e) => populateOperators(e.target.textContent)));
equalButton.addEventListener('click', calculate);
allClearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', deleteNumber);
percentButton.addEventListener('click', addPercentage);
negateButton.addEventListener('click', addNegation);
decimalButton.addEventListener('click', addDecimal);
document.addEventListener('keydown', (e) => pressKeyboard(e.key));