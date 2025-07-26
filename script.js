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
keys.forEach((key) => {
  const keyDiv = document.createElement("div");
  keyDiv.textContent = key;
  if (key === "=") {
    keyDiv.classList.add("key", "big", "grey");
  } else if (key === "AC") {
    keyDiv.classList.add("key", "red", "small");
  } else {
    keyDiv.classList.add("key", "grey", "small");
  }
  keyDiv.setAttribute("data-code", key);
  keyDiv.addEventListener("click", (e) => {
    console.log(e.target.dataset.code);
  });
  keypadDiv.appendChild(keyDiv);
});
