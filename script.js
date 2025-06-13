//Example script
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

//Add custom words as an array
let currentLine = 1;
let won = false;
let currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
let currentWordArray = currentWord.toLowerCase().split("");
const generateNewWord = () => {
  currentWord = words[Math.floor(Math.random() * words.length)];
  currentWordArray = currentWord.split("");
  currentInput = [];
  currentLine = 1;
  won = false;
  for (let line = 1; line < 7; line++) {
    for (let column = 0; column < 5; column++) {
      const box = document.getElementById(line + "_" + (column + 1));
      box.innerHTML = "";
      box.setAttribute("class", "");
    }
  };
};
let currentInput = [];
let keypressed = {};
const processInput = (keyPressed) => {
  let key = keyPressed.key.toLowerCase();
  if (keyPressed.code == "Backspace") {
    currentInput.pop();
    addInput();
  } else if (keyPressed.code == "Enter") {
    enterInput();
    revealAnswers();
  } else if (currentInput.length < 5) {
    checkValidChar(keyPressed);
    addInput();
  };
};
function addInput() {
  if (won == false) {
    updateUI(currentLine);
  };
};
function checkValidChar(keyPressed) {
  let key = keyPressed.code;
  if (key == "KeyA" || key == "KeyB" || key == "KeyC" || key == "KeyD" || key == "KeyE" || key == "KeyF" || key == "KeyG" || key == "KeyH" || key == "KeyI" || key == "KeyJ" || key == "KeyK" || key == "KeyL" || key == "KeyM" || key == "KeyN" || key == "KeyO" || key == "KeyP" || key == "KeyQ" || key == "KeyR" || key == "KeyS" || key == "KeyT" || key == "KeyU" || key == "KeyV" || key == "KeyW" || key == "KeyX" || key == "KeyY" || key == "KeyZ") {
    currentInput.push(keyPressed.key.toLowerCase());
  };
};
function enterInput() {
  if (won == true) { return; };
  if (currentInput.length == 5 && currentLine != 7) {
    checkAnswers(currentLine);
    currentLine += 1;
    currentInput = [];
  } else {
    alert("Your word is not long enough!");
  };
};
function revealAnswers() {
  if (currentLine == 7 && won === false) {
    alert("The correct answer was \"" + currentWord + "\"");
  };
};
document.addEventListener("keydown", processInput, false);
// Redirect mobile input into keypress handler
const mobileInput = document.getElementById("mobile-keyboard-trigger");
if (mobileInput) {
  mobileInput.addEventListener("input", (e) => {
    const char = e.target.value.slice(-1);
    if (char) {
      const fakeEvent = new KeyboardEvent("keydown", { key: char, code: "Key" + char.toUpperCase() });
      document.dispatchEvent(fakeEvent);
    }
    e.target.value = "";
  });

  // Auto-focus it on page load
  window.addEventListener("load", () => {
    mobileInput.focus();
  });

  // Refocus it anytime the user taps the screen
  document.addEventListener("touchstart", () => {
    mobileInput.focus();
  });
}

function updateUI(currentLine) {
  for (let clearBox = 1; clearBox < 6; clearBox++) {
    let currentClearBox = document.getElementById(currentLine + "_" + clearBox);
    currentClearBox.innerHTML = "";
  };
  for (let box = 1; box < currentInput.length + 1; box++) {
    let currentBox = document.getElementById(currentLine + "_" + box);
    currentBox.innerHTML = currentInput[box - 1].toUpperCase();
  };
};
function checkAnswers(currentLine) {
  for (let box = 1; box < 6; box++) {
    let currentBox = document.getElementById(currentLine + "_" + box);
    currentBox.setAttribute("class", "box-incorrect");
    if (currentInput[box - 1] == currentWordArray[box - 1]) {
      currentBox.setAttribute("class", "box-correct");
    } else {
      for (let arrayIndex = 0; arrayIndex < 5; arrayIndex++) {
        if (currentInput[box - 1] == currentWordArray[arrayIndex]) {
          currentBox.setAttribute("class", "box-yellow");
        };
      };
    };
    if (box == 5) {
      let box1 = document.getElementById(currentLine + "_1").innerHTML.toLowerCase();
      let box2 = document.getElementById(currentLine + "_2").innerHTML.toLowerCase();
      let box3 = document.getElementById(currentLine + "_3").innerHTML.toLowerCase();
      let box4 = document.getElementById(currentLine + "_4").innerHTML.toLowerCase();
      let box5 = document.getElementById(currentLine + "_5").innerHTML.toLowerCase();
      if (box1 === currentWordArray[0] && box2 === currentWordArray[1] && box3 === currentWordArray[2] && box4 === currentWordArray[3] && box5 === currentWordArray[4]) {
        alert("Correct!");
        won = true;
      };
    };
  };
};
