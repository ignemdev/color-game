const squares = document.querySelectorAll(".square"),
    gameDisplay = document.getElementById("gamedisplay"),
    colorDisplay = document.getElementById("colordisplay"),
    messageDisplay = document.getElementById("messagedisplay"),
    resetButton = document.getElementById("resetbutton"),
    easyMode = document.getElementById("easy"),
    hardMode = document.getElementById("hard"),
    modeButtons = document.getElementsByClassName("mode");

let numberSquares = 6,
    colors = [],
    pickedColor;

init();

function init() {
    setModeButtons();
    setSqueareListeners();
    reset();
}

function setModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[1].classList.remove("selected");
            modeButtons[0].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numberSquares = 3 : numberSquares = 6;
            reset();
        });
    }
}

function setSqueareListeners() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!"
                gameDisplay.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play again?";
                changeColor(pickedColor);
            } else {
                this.style.backgroundColor = "#232323"
                messageDisplay.textContent = "Try again!"
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numberSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New colors"
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
        gameDisplay.style.backgroundColor = "steelblue";
    };
}


resetButton.addEventListener("click", reset);


function changeColor(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
}
