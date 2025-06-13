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

  const guessedWord = currentInput.join("");

  if (guessedWord === currentWord) {
    won = true;
    setTimeout(() => {
      showCustomMessage("✅ Correct! Great job.");
    }, 200);
  } else if (currentLine === 6) {
    setTimeout(() => {
      showCustomMessage(`The word was "${currentWord.toUpperCase()}"`);
    }, 200);
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
      showCustomMessage("Your word is not long enough!");
    }
  } else if (/^[a-zA-Z]$/.test(key) && currentInput.length < 5) {
    currentInput.push(key.toLowerCase());
    updateUI();
  }
}

window.addEventListener("keydown", (e) => {
  handleKey(e.key);
});

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
