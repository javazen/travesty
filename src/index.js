import {MAX_SUPPORTED_LEVEL, transform, getOutputTooltip, cleanStr} from './travesty.js';

const TRACE = true;

let levelInput, levelValue = 2, decrementBtn, incrementBtn, transformBtn, cleanBtn;

// In the unlikely event this is run in a REALLY old browser that does not support console.log
if (!window.console) { window.console = { log: function(){} }; }

if (TRACE) console.log('index.js loaded');

document.addEventListener("DOMContentLoaded", function(event) {
  if (TRACE) console.log('DOMContentLoaded');
  decrementBtn = document.getElementById("decrement");
  decrementBtn.addEventListener('click', handleDecrement);
  incrementBtn = document.getElementById("increment");
  incrementBtn.addEventListener('click', handleIncrement);
  transformBtn = document.getElementById("wand")
  transformBtn.addEventListener('click', handleTransform)
  // cleanBtn = document.getElementById("cleanStr");
  // cleanBtn.addEventListener('click', handleClean);
  levelInput = document.getElementById('level');
  levelInput.value = levelValue;
  levelInput.addEventListener('input', handleLevelInput);
  updateUI(levelValue);
});

// when user changes level...
function handleLevelInput() {
  levelValue = +this.value;
  updateUI(levelValue);
}

// when user clicks decrement...
function handleDecrement() {
  levelValue -= 1;
  const levelText = document.getElementById("level");
  levelText.value = levelValue;
  const str = document.getElementById("inputtext").value;
  const newstr = transform(str, levelValue);
  updateOutput(newstr);
  updateUI(levelValue);
}

// when user clicks increment...
function handleIncrement() {
  levelValue += 1;
  const levelText = document.getElementById("level");
  levelText.value = levelValue;
  const str = document.getElementById("inputtext").value;
  const newstr = transform(str, levelValue);
  updateOutput(newstr);
  updateUI(levelValue);
}

// when user clicks transform...
function handleTransform() {
  const str = document.getElementById("inputtext").value;
  const newstr = transform(str, levelValue);
  updateOutput(newstr);
}

// when user clicks clean...
function handleClean() {
  const str = document.getElementById("inputtext").value;
  const newstr = cleanStr(str);
  updateOutput(newstr);
}

function updateUI(levelValue) {
  adjustIncrDecrButtons(levelValue);
  adjustOutputTooltip();
}

// enable/disable buttons depending on levelValue
function adjustIncrDecrButtons(levelValue) {
  decrementBtn.disabled = (levelValue <= 0);
  incrementBtn.disabled = (levelValue >= MAX_SUPPORTED_LEVEL);
}

function adjustOutputTooltip() {
  const outputtext = document.getElementById("outputtext");
  outputtext.title = getOutputTooltip(levelValue);
}

function updateOutput(str) {
  const outputtext = document.getElementById("outputtext");
  outputtext.value = str;
}

