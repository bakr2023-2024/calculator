const container = document.querySelector(".container");
const R = 6;
const C = 4;
const audio = new Audio("./click-21156.mp3");
const accuracy = 5;
const displayScreen = document.querySelector(".display-screen");
const displayScreenEquation = document.querySelector(".displayScreen_equation");
const displayScreenResult = document.querySelector(".displayScreen_result");
const buttons = document.querySelector(".buttons");
let num1 = 0;
let operator = "";
let num2 = 0;
const icons = [
  "%",
  "CE",
  "C",
  "DEL",
  "1/x",
  "x^2",
  "2√x",
  "÷",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "+/-",
  "0",
  ".",
  "=",
];
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.style.width = `${100 / C}%`;
    button.style.height = `${100 / R}%`;
    button.textContent = icons[i * C + j];
    buttons.appendChild(button);
  }
}
let displayEquation = (num1, operator) => {
  displayScreenEquation.textContent = `${num1} ${operator}`;
  num2 = 0;
  isDecimalPoint = false;
  displayResult(num2);
};
let colorButtons = (buttons) => {
  let digitButtons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let i = 0; i < buttons.length; i++) {
    if (digitButtons.includes(buttons[i].textContent)) {
      buttons[i].style.backgroundColor = "#444444";
    } else {
      buttons[i].style.backgroundColor = "#222222";
    }
  }
};
let assignEventListeners = () => {
  const buttons = document.querySelectorAll(".button");
  colorButtons(buttons);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      audio.currentTime = 0;
      audio.play();
      switch (buttons[i].textContent) {
        case "C":
          clear();
          break;
        case "DEL":
          if (operator === "") {
            deleteLast(num1);
          } else {
            deleteLast(num2);
          }
          break;
        case "+":
          inputOperator(buttons[i].textContent);
          break;
        case "-":
          inputOperator(buttons[i].textContent);
          break;
        case "x":
          inputOperator(buttons[i].textContent);
          break;
        case "÷":
          inputOperator(buttons[i].textContent);
          break;
        case "%":
          inputOperator(buttons[i].textContent);
          break;
        case "1/x":
          if (operator === "") {
            num1 = divide(1, num1);
            displayResult(num1);
          } else {
            num2 = divide(1, num2);
            displayResult(num2);
          }
          break;
        case "x^2":
          if (operator === "") {
            num1 = square(num1);
            displayResult(num1);
          } else {
            num2 = square(num2);
            displayResult(num2);
          }
          break;
        case "2√x":
          if (operator === "") {
            num1 = squareRoot(num1);
            displayResult(num1);
          } else {
            num2 = squareRoot(num2);
            displayResult(num2);
          }
          break;
        case "+/-":
          if (operator === "") {
            num1 = negate(num1);
            displayResult(num1);
          } else {
            num2 = negate(num2);
            displayResult(num2);
          }
          break;
        case "=":
          if (operator === "") {
            displayResult(num1);
          } else {
            num1 = String(calculate(num1, operator, num2));
            if (num1.includes(".")) isDecimalPoint = true;
            else isDecimalPoint = false;
            num2 = 0;
            console.log(
              `result: ${num1}`,
              `isDecimalPoint: ${isDecimalPoint}, num1: ${num1}, num2: ${num2}`
            );
            operator = "";
            displayResult(num1);
          }
          break;
        case "CE":
          if (operator === "") {
            num1 = 0;
            displayResult(num1);
          } else {
            num2 = 0;
            displayResult(num2);
          }
          isDecimalPoint = false;
          break;
        case ".":
          inputDecimalPoint();
          break;
        default:
          inputNumber(buttons[i].textContent);
          break;
      }
    });
  }
};
let isDecimalPoint = false;
let inputDecimalPoint = () => {
  if (isDecimalPoint) {
    return;
  }
  isDecimalPoint = true;
  if (operator === "") {
    num1 = num1 + ".";
    displayResult(num1);
  } else {
    num2 = num2 + ".";
    displayResult(num2);
  }
};
let deleteLast = (num) => {
  if (num === undefined) {
    return;
  }
  num = String(num);
  if (num.length === 1) {
    num = 0;
    isDecimalPoint = false;
  } else {
    if (num[num.length - 1] === ".") {
      isDecimalPoint = false;
    }
    num = num.slice(0, -1);
  }
  if (operator === "") {
    num1 = num;
  } else {
    num2 = num;
  }
  displayResult(num);
};
let displayResult = (num) => {
  displayScreenResult.textContent = num;
};
let disableAllButtons = () => {
  const buttons = document.querySelectorAll(".button");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent === "C" || buttons[i].textContent === "?") {
      continue;
    }
    buttons[i].disabled = true;
  }
};
let enableAllButtons = () => {
  const buttons = document.querySelectorAll(".button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
};
let divide = (num1, num2) => {
  if (num2 === 0) {
    disableAllButtons();
    return "Can't divide by zero";
  } else {
    return num1 / num2;
  }
};
let modulo = (num1, num2) => {
  if (num2 === 0) {
    disableAllButtons();
    return "Can't divide by zero";
  } else {
    return num1 % num2;
  }
};
let multiply = (num1, num2) => {
  return num1 * num2;
};
let add = (num1, num2) => {
  return num1 + num2;
};
let subtract = (num1, num2) => {
  return num1 - num2;
};
let square = (num) => {
  return Math.pow(num, 2);
};
let squareRoot = (num) => {
  if (num < 0) {
    disableAllButtons();
    return "Can't square root negative number";
  }
  return Math.sqrt(num);
};
let negate = (num) => {
  return -num;
};
let clear = () => {
  enableAllButtons();
  num1 = 0;
  operator = "";
  num2 = 0;
  isDecimalPoint = false;
  displayScreenEquation.textContent = "";
  displayResult(num1);
};
let roundAnswer = (result) => {
  return Math.round(result * 10 ** accuracy) / 10 ** accuracy;
};
let calculate = (n1, operator, n2) => {
  console.log(n1, operator, n2);
  num1 = Number.parseFloat(n1);
  num2 = Number.parseFloat(n2);

  let result;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "x":
      result = multiply(num1, num2);
      break;
    case "÷":
      result = divide(num1, num2);
      break;
    case "%":
      result = modulo(num1, num2);
      break;
    default:
      disableAllButtons();
      return "Error";
  }
  displayScreenEquation.textContent = "";
  return roundAnswer(result);
};
let inputOperator = (op) => {
  if (operator === "") {
    operator = op;
    displayEquation(num1, operator);
  } else {
    num1 = calculate(num1, operator, num2);
    operator = op;
    displayEquation(num1, operator);
  }
};
let inputNumber = (str) => {
  str = Number(str);
  if (isDecimalPoint) {
    if (operator === "") {
      if (String(num1).length > 14) return;
      num1 = num1 + str;
      displayResult(num1);
    } else {
      if (String(num2).length > 14) return;
      num2 = num2 + str;
      displayResult(num2);
    }
  } else {
    if (operator === "") {
      if (String(num1).length > 14) return;
      num1 = num1 * 10 + str;
      displayResult(num1);
    } else {
      if (String(num2).length > 14) return;
      num2 = num2 * 10 + str;
      displayResult(num2);
    }
  }
};
assignEventListeners();
