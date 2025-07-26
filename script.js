const displayPadDiv = document.querySelector("#displayPad");
const displayDiv = document.querySelector("#display");
const keypadDiv = document.querySelector("#keypad");
const keys = [
  "AC",
  "DEL",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];
const operators = ["+", "-", "*", "/", "%"];
let number1 = null;
let operator = null;
let number2 = null;
let buffer = "";
keys.forEach((key) => {
  const keyDiv = document.createElement("div");
  keyDiv.textContent = key;
  if (key === "=") {
    keyDiv.classList.add("key", "big");
  } else if (key === "AC") {
    keyDiv.classList.add("key", "red", "small");
  } else {
    keyDiv.classList.add("key", "grey", "small");
  }
  keyDiv.setAttribute("data-code", key);
  keyDiv.addEventListener("click", (e) => {
    addToBuffer(e.target.dataset.code);
  });
  keypadDiv.appendChild(keyDiv);
});
const clearBuffer = () => {
  number1 = null;
  operator = null;
  number2 = null;
  buffer = "";
  displayDiv.textContent = buffer;
};
const addToBuffer = (char) => {
  if ((char === "." && !buffer.includes(".")) || !isNaN(char)) {
    buffer += char;
    displayDiv.textContent = buffer;
  } else if (operators.includes(char)) {
    operator = char;
    if (number1 === null) {
      number1 = Number(buffer);
    } else if (number2 === null) {
      number2 = Number(buffer);
    }
    if (number1 !== null && number2 !== null) {
      number1 = operate(number1, operator, number2);
      number2 = null;
      displayDiv.textContent = number1;
    }
    buffer = "";
  } else {
    switch (char) {
      case "DEL":
        if (buffer.length > 0) buffer = buffer.substring(0, buffer.length - 1);
        displayDiv.textContent = buffer;
        break;
      case "AC":
        clearBuffer();
        break;
      case "=":
        number2 = Number(buffer);
        if (number1 != null && number2 != null && operator != null) {
          const result = operate(number1, operator, number2);
          clearBuffer();
          number1 = result;
          displayDiv.textContent = number1;
        }
        break;
    }
  }
  console.log(number1, operator, number2);
};
const operate = (num1 = 0, op = "+", num2 = 0) => {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 === 0 ? NaN : num1 / num2;
    case "%":
      return num2 === 0 ? NaN : num1 % num2;
    default:
      return 0;
  }
};
