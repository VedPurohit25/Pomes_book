// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const pageIndicator = document.querySelector("#page-indicator");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");

// State Management
let currentLocation = 1;
const numOfPapers = 4;
const maxLocation = numOfPapers + 1;

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Add click listeners to papers for intuitive turning
[paper1, paper2, paper3, paper4].forEach((paper, index) => {
  paper.addEventListener("click", () => {
    if (currentLocation === index + 1) {
      goNextPage();
    } else if (currentLocation === index + 2) {
      goPrevPage();
    }
  });
});

// Keyboard Navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goNextPage();
  if (e.key === "ArrowLeft") goPrevPage();
});

// Open / Close Book Helpers
function openBook() {
  book.classList.add("opened");
  book.classList.remove("closed-end");
}

function closeBook(isAtBeginning) {
  if (isAtBeginning) {
    book.classList.remove("opened");
    book.classList.remove("closed-end");
  } else {
    book.classList.remove("opened");
    book.classList.add("closed-end");
  }
}

// Main Page Flipping Logic
function goNextPage() {
  if (currentLocation < maxLocation) {
    switch (currentLocation) {
      case 1:
        openBook();
        paper1.classList.add("flipped");
        paper1.style.zIndex = 1;
        break;
      case 2:
        paper2.classList.add("flipped");
        paper2.style.zIndex = 2;
        break;
      case 3:
        paper3.classList.add("flipped");
        paper3.style.zIndex = 3;
        break;
      case 4:
        paper4.classList.add("flipped");
        paper4.style.zIndex = 4;
        closeBook(false);
        break;
      default:
        throw new Error("Unknown state");
    }
    currentLocation++;
    updateIndicator();
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    switch (currentLocation) {
      case 2:
        closeBook(true);
        paper1.classList.remove("flipped");
        paper1.style.zIndex = 6;
        break;
      case 3:
        paper2.classList.remove("flipped");
        paper2.style.zIndex = 5;
        break;
      case 4:
        paper3.classList.remove("flipped");
        paper3.style.zIndex = 4;
        break;
      case 5:
        openBook();
        paper4.classList.remove("flipped");
        paper4.style.zIndex = 3;
        break;
      default:
        throw new Error("Unknown state");
    }
    currentLocation--;
    updateIndicator();
  }
}

// Indicator Label Updates
function updateIndicator() {
  if (currentLocation === 1) {
    pageIndicator.textContent = "Cover";
  } else if (currentLocation === maxLocation) {
    pageIndicator.textContent = "End";
  } else {
    pageIndicator.textContent = `Spread ${currentLocation - 1}`;
  }
}

// Theme Switcher Logic
const themeBtn = document.querySelector("#theme-btn");

// Check for saved preference in localStorage
const savedTheme = localStorage.getItem("anthology_theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");

  if (isLight) {
    themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    localStorage.setItem("anthology_theme", "light");
  } else {
    themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
    localStorage.setItem("anthology_theme", "dark");
  }
});