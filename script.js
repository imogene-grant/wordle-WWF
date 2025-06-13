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
  "BEAKS","CHIRP","QUILL","VALUE","GUARD","FENCE","RESET","SHIFT","REUSE","RENEW",
  "CYCLE","CIVIC","UNITY","PEACE","TRUST","ADAPT","CLEAN","BIOME","BIOTA","PLANET"
];

let currentLine = 1;
let won = false;
let currentInput = [];
let currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
let currentWordArray = currentWord.split("");

function generateNewWord() {
  currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  currentWordArray = currentWord.split("");
  currentInput = [];
  currentLine = 1;
  won = false;
  for (let r = 1; r <= 6; r++) {
    for (let c = 1; c <= 5; c++) {
      const box = document.getElementById(`${r}_${c}`);
      if (box) {
        box.textContent = "";
        box.className = "";
      }
    }
  }
}

function updateUI() {
  for (let i = 1; i <= 5; i++) {
    const box = document.getElementById(`${currentLine}_${i}`);
    box.textContent = currentInput[i - 1] ? currentInput[i - 1].toUpperCase() : "";
  }
}

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

  if (currentInput.join("") === currentWord) {
    alert("Correct!");
    won = true;
  } else if (currentLine === 6) {
    alert(`The correct answer was "${currentWord.toUpperCase()}"`);
  }
}

function handleKey(key) {
  if (won) return;
  if (key === "Backspace") {
    currentInput.pop();
    updateUI();
  } else if (key === "Enter") {
    if (currentInput.length === 5) {
      checkAnswers();
      currentLine++;
      currentInput = [];
      updateUI();
    } else {
      alert("Your word is not long enough!");
    }
  } else if (/^[a-zA-Z]$/.test(key) && currentInput.length < 5) {
    currentInput.push(key.toLowerCase());
    updateUI();
  }
}

window.addEventListener("keydown", (e) => {
  handleKey(e.key);
});
