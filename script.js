//Example script
const words = ["hello", "world", "words"]; //Add custom words as an array
let currentLine = 1;
let won = false;
let currentWord = words[Math.floor(Math.random() * words.length)];
let currentWordArray = currentWord.split("");
const generateNewWord = () => {
  currentWord = words[Math.floor(Math.random() * words.length)];
  currentWordArray = currentWord.split("");
  currentInput = [];
  currentLine = 1;
  won = false;
  for(let line = 1; line < 7; line++) {
    let box1 = document.getElementById(line + "_1");
    let box2 = document.getElementById(line + "_2");
    let box3 = document.getElementById(line + "_3");
    let box4 = document.getElementById(line + "_4");
    let box5 = document.getElementById(line + "_5");
    box1.innerHTML = "";
    box2.innerHTML = "";
    box3.innerHTML = "";
    box4.innerHTML = "";
    box5.innerHTML = "";
    box1.classList.remove("box-incorrect");
    box2.classList.remove("box-incorrect");
    box3.classList.remove("box-incorrect");
    box4.classList.remove("box-incorrect");
    box5.classList.remove("box-incorrect");
    box1.classList.remove("box-correct");
    box2.classList.remove("box-correct");
    box3.classList.remove("box-correct");
    box4.classList.remove("box-correct");
    box5.classList.remove("box-correct");
    box1.classList.remove("box-yellow");
    box2.classList.remove("box-yellow");
    box3.classList.remove("box-yellow");
    box4.classList.remove("box-yellow");
    box5.classList.remove("box-yellow");
  };
};
let currentInput = [];
let keypressed = {};
const processInput = (keyPressed) => {
  let key = keyPressed.key.toLowerCase();
  if(keyPressed.code == "Backspace") {
    currentInput.pop();
    addInput();
  } else if(keyPressed.code == "Enter") {
    enterInput();
    revealAnswers();
  } else if(currentInput.length < 5) {
    checkValidChar(keyPressed);
    addInput();
  };
};
function addInput() {
  if(won == false) {
    updateUI(currentLine);
  };
};
function checkValidChar(keyPressed) {
  let key = keyPressed.code;
  if(key == "KeyA" || key == "KeyB" || key == "KeyC" || key == "KeyD" || key == "KeyE" || key == "KeyF" || key == "KeyG" || key == "KeyH" || key == "KeyI" || key == "KeyJ" || key == "KeyK" || key == "KeyL" || key == "KeyM" || key == "KeyN" || key == "KeyO" || key == "KeyP" || key == "KeyQ" || key == "KeyR" || key == "KeyS" || key == "KeyT" || key == "KeyU" || key == "KeyV" || key == "KeyW" || key == "KeyX" || key == "KeyY" || key == "KeyZ") {
     currentInput.push(keyPressed.key.toLowerCase());
  };
};
function enterInput() {
  if(won == true) {return;};
  if(currentInput.length == 5 && currentLine != 7) {
    checkAnswers(currentLine);
    currentLine += 1;
    currentInput = [];
  } else {
    alert("Your word is not long enough!");
  };
};
function revealAnswers() {
  if(currentLine == 7 && won === false) {
    alert("The correct answer was \"" + currentWord + "\"");
  };
};
document.addEventListener("keydown", processInput, false);
function updateUI(currentLine) {
  for(let clearBox = 1; clearBox < 6; clearBox++) {
    let currentClearBox = document.getElementById(currentLine + "_" + clearBox);
    currentClearBox.innerHTML = "";
  };
  for(let box = 1; box < currentInput.length + 1; box++) {
    let currentBox = document.getElementById(currentLine + "_" + box);
    currentBox.innerHTML = currentInput[box - 1].toUpperCase();
  };
};
function checkAnswers(currentLine) {
  for(let box = 1; box < 6; box++) {
    let currentBox = document.getElementById(currentLine + "_" + box);
    currentBox.setAttribute("class", "box-incorrect");
    if(currentInput[box - 1] == currentWordArray[box - 1]) {
      currentBox.setAttribute("class", "box-correct");
    } else {
      for(let arrayIndex = 0; arrayIndex < 5; arrayIndex++) {
        if(currentInput[box - 1] == currentWordArray[arrayIndex]) {
          currentBox.setAttribute("class", "box-yellow");
        };
      };
    };
    if(box == 5) {
      let box1 = document.getElementById(currentLine + "_1").innerHTML.toLowerCase();
      let box2 = document.getElementById(currentLine + "_2").innerHTML.toLowerCase();
      let box3 = document.getElementById(currentLine + "_3").innerHTML.toLowerCase();
      let box4 = document.getElementById(currentLine + "_4").innerHTML.toLowerCase();
      let box5 = document.getElementById(currentLine + "_5").innerHTML.toLowerCase();
      if(box1 === currentWordArray[0] && box2 === currentWordArray[1] && box3 === currentWordArray[2] && box4 === currentWordArray[3] && box5 === currentWordArray[4]) {
        alert("Correct!");
        won = true;
      };
    };
  };
};