const words = [
  "KOALA","BILBY","QUOLL","WOYLI","WOMBAT","OTTER","EAGLE","HERON","CRANE","SKINK",
  "TIGER","PANDA","LEMUR","SLOTH","ORCAS","SHARK","WHALE","DOLPH","SEALS","TROUT",
  "CORAL","REEFS","DELTA","SWAMP","CREEK","GLADE","GROVE","MARSH","RIDGE","DUNES",
  "ISLES","CAVES","CLIFF","BEACH","WOODS","PARKS","TRAIL","FOREST","TREES","BUSHY",
  "LEAFY","SCRUB","GRASS","VINES","FERNS","FLORA","FAUNA","MOSSY","MULGA","LOAMY",
  "REEDS","FROND","PALMS","ALGAE","LOTUS","KELPS","FUNGI","CACTI","THORN","MULCH",
  "PLANT","BLOOM","GREEN","EARTH","WATER","OCEAN","TIDES","WAVES","CLOUD","STORM",
  "RAINS","FIRES","FLOOD","SMOKE","HAZEY","FOGGY","WINDS","THAWS","MELTS","EMBER",
  "FLAME","BLAZE","DRIES","DROPS","DEEPS","FROTH","EBBED","SHOAL","DRIFT","BRACK",
  "MIRKY","ROCKY","EARTHY","GNARL","SANDS","GULLY","THRUM","NESTS","SHELL","LARKS",
  "BEAKS","CHIRP","QUILL"
];

let currentLine = 1;
let won = false;
let currentInput = [];
let currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
let currentWordArray = currentWord.split("");

const generateNewWord = () => {
  currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  currentWordArray = currentWord.split("");
  currentInput = [];
  currentLine = 1;
  won = false;
  for (let line = 1; line <= 6; line++) {
    for (let column = 1; column <= 5; column++) {
      const box = document.getElementById(`${line}_${column}`);
      box.innerHTML = "";
      box.className = "";
    }
  }
};

function updateUI() {
  for (let i = 1; i <= 5; i++) {
    const box = document.getElementById(`${currentLine}_${i}`);
    box.innerHTML = currentInput[i - 1] ? currentInput[i - 1].toUpperCase() : "";
  }
}

function checkAnswers() {
  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`${currentLine}_${i + 1}`);
    const letter = currentInput[i];
    if (letter === currentWordArray[i]) {
      box.className = "box-correct";
    } else if (currentWordArray.includes(letter)) {
      box.className = "box-yellow";
    } else {
      box.className = "box-incorrect";
    }
  }

  if (currentInput.join("") === currentWord) {
    alert("Correct!");
    won = true;
  } else if (currentLine === 6) {
    alert(`The correct answer was "${currentWord.toUpperCase()}"`);
  }
}

function enterInput() {
  if (won || currentInput.length !== 5) {
    alert("Your word is not long enough!");
    return;
  }
  checkAnswers();
  currentLine++;
  currentInput = [];
}

function handleKeyInput(key) {
  if (won) return;

  if (key === "Backspace") {
    currentInput.pop();
  } else if (key === "Enter") {
    enterInput();
  } else if (/^[a-zA-Z]$/.test(key) && currentInput.length < 5) {
    currentInput.push(key.toLowerCase());
  }
  updateUI();
}

// DESKTOP
window.addEventListener("keydown", (e) => {
  handleKeyInput(e.key);
});

// MOBILE
const mobileInput = document.getElementById("mobile-keyboard-trigger");
if (mobileInput) {
  mobileInput.addEventListener("input", (e) => {
    const val = e.target.value.slice(-1);
    e.target.value = "";
    if (val) handleKeyInput(val);
  });

  window.addEventListener("load", () => {
    mobileInput.focus();
  });

  document.addEventListener("touchstart", () => {
    mobileInput.focus();
  });
}
