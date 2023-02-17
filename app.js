const defaultColor = "#282828";
const defaultMode = "color";
const defaultSize = 16;

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeValue = document.getElementById("size-value");
const rangeSlide = document.getElementById("rangeSlide");
const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");

function changeColor(newColor) {
  currentColor = newColor;
}

function changeMode(newMode) {
  currentMode = newMode;
}

function changeSize(newSize) {
  currentSize = newSize;
}

function changeSizeValue(value) {
  changeSize(value);
  updateSize(value);
  reloadGrid();
}

function updateSize(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
  clearGrid();
  createGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = "";
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//Button events

colorPicker.oninput = (e) => changeColor(e.target.value);
colorBtn.onclick = () => changeMode("color");
rainbowBtn.onclick = () => changeMode("rainbow");
eraserBtn.onclick = () => changeMode("eraser");
clearBtn.onclick = () => reloadGrid();
rangeSlide.onmousemove = (e) => updateSize(e.target.value);
rangeSlide.onchange = (e) => changeSizeValue(e.target.value);

// Grid

function createGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mouseover", paintGrid);
    gridElement.addEventListener("mousedown", paintGrid);
    grid.appendChild(gridElement);
  }
}

// Painting

function paintGrid(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

window.onload = () => {
  createGrid(defaultSize);
};
