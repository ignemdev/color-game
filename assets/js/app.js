//elements
const squares = document.querySelectorAll(".square");
const gameDisplay = document.querySelector("#gamedisplay");
const colorDisplay = document.querySelector("#colordisplay");
const messageDisplay = document.querySelector("#messagedisplay");
const resetButton = document.querySelector("#resetbutton");
const easyMode = document.querySelector("#easy");
const hardMode = document.querySelector("#hard");
const modeButtons = document.querySelectorAll(".mode");

//config
let numberSquares = 6;
let colors = [];
let pickedColor;
const gameDisplayColor = "steelblue";

//logic
const pickColor = () => {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateRandomColors = (num) => {
  const randomColors = Array.from({ length: num }, randomColor);
  return randomColors;
};

const resetColors = () => {
  squares.forEach((square, i) => {
    if (colors[i]) {
      square.style.backgroundColor = colors[i];
      square.style.display = "block";
    } else {
      square.style.display = "none";
    }

    gameDisplay.style.backgroundColor = gameDisplayColor;
  });
};

const reset = () => {
  colors = generateRandomColors(numberSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New colors";
  resetColors();
};

const setModeButtons = () => {
  for (const button of modeButtons) {
    button.addEventListener("click", () => {
      Array.from(modeButtons).forEach((button) =>
        button.classList.remove("selected")
      );
      button.classList.add("selected");
      numberSquares = button.textContent === "Easy" ? 3 : 6;
      reset();
    });
  }
};

const changeColor = (color) => {
  for (const element of squares) element.style.backgroundColor = color;
};

const setSqueareListeners = () => {
  squares.forEach((square, i) => {
    square.style.backgroundColor = colors[i];
    square.addEventListener("click", ({ target }) => {
      const clickedColor = target.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        gameDisplay.style.backgroundColor = pickedColor;
        resetButton.textContent = "Play again?";
        changeColor(pickedColor);
      } else {
        target.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again!";
      }
    });
  });
};

const init = () => {
  setModeButtons();
  setSqueareListeners();
  reset();
};

//listeners
window.addEventListener("DOMContentLoaded", init);
resetButton.addEventListener("click", reset);
