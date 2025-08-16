const words = [
  // 🌍 Environment & Landscapes
  "PLANET", "FOREST", "JUNGLE", "DESERT", "TUNDRA", "CANYON", "VALLEY",
  "PLAINS", "STREAM", "RIVERS", "OCEANS", "LAGOON", "BEACHY", "MARSHY",
  "SUMMIT", "MEADOW", "RIDGES", "COASTS", "GROVES",

  // 🌱 Nature & Ecology
  "FLOWER", "BLOOMS", "FRUITS", "POLLEN", "EARTHY", "BIOMES", "FLORAL",
  "FAUNAL", "SHRUBS", "SEABED", "NATURE",

  // 🐾 Animals & Wildlife
  "WOMBAT", "SALMON", "BEETLE", "HERONS", "EAGLES", "TIGERS", "PANDAS", "BOVINE",

  // 🌦 Climate & Seasons
  "WINTER", "SPRING", "SUMMER", "AUTUMN", "SUNSET", "STORMS", "ARCTIC",

  // ♻️ Conservation & People
  "RECYCLE", "RENEWAL", "RANGER", "HUMANS", "CIVICS"
];

const GRID_SIZE = 6;
let currentLine = 1;
let won = false;
let currentInput = [];
let currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
let currentWordArray = currentWord.split("");

// Reset and generate new word
function generateNewWord() {
  currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  currentWordArray = currentWord.split("");
  currentInput = [];
  currentLine = 1;
  won = false;

  for (let r = 1; r <= GRID_SIZE; r++) {
    for (let c = 1; c <= GRID_SIZE; c++) {
      const box = document.getElementById(`${r}_${c}`);
      if (box) {
        box.textContent = "";
        box.className = "";
      }
    }
  }
}

// Update boxes in current row
function updateUI() {
  for (let i = 1; i <= GRID_SIZE; i++) {
    const box = document.getElementById(`${currentLine}_${i}`);
    if (box) {
      box.textContent = currentInput[i - 1] ? currentInput[i - 1].toUpperCase() : "";
    }
  }
}

// Check word match and highlight
function checkAnswers() {
  currentInput.forEach((letter, i) => {
    const box = document.getElementById(`${currentLine}_${i + 1}`);
    if (!box) return;

    if (letter === currentWordArray[i]) {
      box.className = "box-correct";
    } else if (currentWordArray.includes(letter)) {
      box.className = "box-yellow";
    } else {
      box.className = "box-incorrect";
    }
  });

  const guessedWord = currentInput.join("");

  if (guessedWord === currentWord) {
    won = true;
    setTimeout(() => {
      showCustomMessage("✅ Correct! Great job.");
    }, 200);
  } else if (currentLine === GRID_SIZE) {
    setTimeout(() => {
      showCustomMessage(`The word was "${currentWord.toUpperCase()}"`);
    }, 200);
  }
}

// Handle input
function handleKey(key) {
  if (won) return;

  if (key === "Backspace") {
    currentInput.pop();
    updateUI();
  } else if (key === "Enter") {
    if (currentInput.length === GRID_SIZE) {
      checkAnswers();
      currentLine++;
      currentInput = [];
      updateUI();
    } else {
      showCustomMessage("Your word is not long enough!");
    }
  } else if (/^[a-zA-Z]$/.test(key) && currentInput.length < GRID_SIZE) {
    currentInput.push(key.toLowerCase());
    updateUI();
  }
}

// Keyboard support
window.addEventListener("keydown", (e) => {
  handleKey(e.key);
});

// Pop-up dismiss
document.addEventListener("DOMContentLoaded", () => {
  const closeIntro = document.getElementById("close-intro");
  if (closeIntro) {
    closeIntro.addEventListener("click", () => {
      document.getElementById("intro-popup").style.display = "none";
    });
  }

  // Mobile tap support
  const gridWrapper = document.querySelector(".wordle-wrapper");
  if (gridWrapper) {
    gridWrapper.addEventListener("touchstart", () => {
      const trigger = document.getElementById("mobile-keyboard-trigger");
      if (trigger) trigger.focus();
    });
    gridWrapper.addEventListener("mousedown", () => {
      const trigger = document.getElementById("mobile-keyboard-trigger");
      if (trigger) trigger.focus();
    });
  }
});

// Message display
function showCustomMessage(message) {
  const msg = document.createElement("div");
  msg.innerText = message;
  msg.style.position = "fixed";
  msg.style.top = "20%";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "#007932";
  msg.style.color = "white";
  msg.style.padding = "12px 24px";
  msg.style.borderRadius = "6px";
  msg.style.fontSize = "1rem";
  msg.style.zIndex = "10000";
  msg.style.opacity = "0";
  msg.style.transition = "opacity 0.3s ease";
  msg.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
  document.body.appendChild(msg);

  requestAnimationFrame(() => {
    msg.style.opacity = "1";
  });

  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 500);
  }, 2500);
}
