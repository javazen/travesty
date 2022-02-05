import {transform, getOutputTooltip} from './travesty.js';

const TRACE = true;

const MAX_SUPPORTED_LEVEL = 7;

let levelInput, levelValue = 2, decrementBtn, incrementBtn, transformBtn;

// In the unlikely event this is run in a REALLY old browser that does not support console.log
if (!window.console) { window.console = { log: function(){} }; }

if (TRACE) console.log('index.js loaded');

document.addEventListener("DOMContentLoaded", function(event) {
  if (TRACE) console.log('DOMContentLoaded');
  decrementBtn = document.getElementById("decrement");
  decrementBtn.addEventListener('click', handleDecrement);
  incrementBtn = document.getElementById("increment");
  incrementBtn.addEventListener('click', handleIncrement);
  transformBtn = document.getElementById("transform");
  transformBtn.addEventListener('click', handleTransform);
  levelInput = document.getElementById('level');
  levelInput.value = levelValue;
  levelInput.addEventListener('input', handleLevelInput);
  updateUI(levelValue);
  // adjustOutputTooltip(levelValue);
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
