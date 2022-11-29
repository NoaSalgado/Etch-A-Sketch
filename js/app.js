//DOM elements
const sketchpad = document.querySelector(".sketchpad");
const darkModeBtn = document.querySelector(".dark-btn");
const randomModeBtn = document.querySelector(".random-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const sizeSpans = document.querySelectorAll(".grid-size p span");
const sizeInputRange = document.querySelector(".grid-size input");
const gridLinesBtn = document.querySelector(".grid-lines-btn");
const clearBtn = document.querySelector(".clear-btn");

//Global variables
let size;
let strokeColor = "var(--clr-secondary)";
let isPainting = false;
let isRandomModeActive = false;

const createGrid = (size) => {
  sketchpad.style.setProperty("--grid-cols", size);
  sketchpad.style.setProperty("--grid-rows", size);

  for (let i = 0; i < size * size; i++) {
    const el = document.createElement("div");
    sketchpad.append(el);
  }
};

const removeGrid = () => {
  [...sketchpad.children].forEach((children) =>
    sketchpad.removeChild(children)
  );
};

const updateGridSize = (size) => {
  sizeSpans.forEach((span) => {
    span.textContent = size;
  });
};

const getRandomColor = () => {
  const red = getRandomValue();
  const green = getRandomValue();
  const blue = getRandomValue();

  return `rgb(${red}, ${green}, ${blue})`;
};

const getRandomValue = () => {
  return Math.floor(Math.random() * 256);
};

//App start
(function start() {
  size = sizeInputRange.value;
  createGrid(size);
  updateGridSize(size);
})();

//Events
sketchpad.addEventListener("mousedown", () => {
  isPainting = true;
});

sketchpad.addEventListener("mousemove", (e) => {
  if (!isPainting) {
    return;
  }

  if (isRandomModeActive) {
    e.target.style.backgroundColor = `${getRandomColor()}`;
  } else {
    e.target.style.backgroundColor = strokeColor;
  }
});

sketchpad.addEventListener("mouseup", () => {
  isPainting = false;
});

darkModeBtn.addEventListener("click", () => {
  isRandomModeActive = false;
  strokeColor = "var(--clr-secondary)";
});

randomModeBtn.addEventListener("click", () => {
  isRandomModeActive = true;
});

eraserBtn.addEventListener("click", () => {
  isRandomModeActive = false;
  strokeColor = "transparent";
});

sizeInputRange.addEventListener("change", (e) => {
  size = e.target.value;
  removeGrid();
  updateGridSize(size);
  createGrid(size);
});

gridLinesBtn.addEventListener("click", () => {
  [...sketchpad.children].forEach((item) => item.classList.toggle("no-lines"));
});

clearBtn.addEventListener("click", () => {
  [...sketchpad.children].forEach((item) => {
    item.style.backgroundColor = "transparent";
  });
});
