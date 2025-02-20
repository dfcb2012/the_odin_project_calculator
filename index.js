let firstNumber = "";
let secondNumber = "";
let operator = "";
let showResult = false;

const display = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
      if (showResult) {
        firstNumber = value;
        showResult = false;
      } else if (!operator) {
        firstNumber += value;
      } else {
        secondNumber += value;
      }
      updateDisplay();
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (firstNumber && !secondNumber) operator = value;
      else if (firstNumber && secondNumber) {
        calculateResult();
        operator = value;
      }
      showResult = false;
    } else if (value === "=") {
      if (firstNumber && operator && secondNumber) calculateResult();
    } else if (value === "C") cleanDisplay();
  });
});

function updateDisplay() {
  display.value = secondNumber || firstNumber || "0";
}

function addOperator(a, b) {
  return a + b;
}

function subtractOperator(a, b) {
  return a - b;
}

function divideOperator(a, b) {
  if (b === 0) {
    display.value = "Error: division by 0";
    limpar();
    return;
  }
  return a / b;
}

function multiplyOperator(a, b) {
  return a * b;
}

function calculateResult() {
  let result = 0;
  switch (operator) {
    case "+":
      result = addOperator(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    case "-":
      result = subtractOperator(
        parseFloat(firstNumber),
        parseFloat(secondNumber)
      );
      break;
    case "*":
      result = multiplyOperator(
        parseFloat(firstNumber),
        parseFloat(secondNumber)
      );
      break;
    case "/":
      result = divideOperator(
        parseFloat(firstNumber),
        parseFloat(secondNumber)
      );
      break;
    default:
      return;
  }
  result = Math.round(result * 10000) / 10000;
  display.value = result;
  firstNumber = result.toString();
  secondNumber = "";
  operator = "";
  showResult = true;
}

function cleanDisplay() {
  display.value = "0";
  firstNumber = "";
  secondNumber = "";
  operator = "";
}
