import {transform} from './travesty.js';

const TRACE = true;
// const DEBUG = true;

let levelInput, levelValue = 2, transformBtn;

if (TRACE) console.log('index.js loaded');

document.addEventListener("DOMContentLoaded", function(event) {
  if (TRACE) console.log('DOMContentLoaded');
  transformBtn = document.getElementById("transform");
  transformBtn.addEventListener('click', handleTransform);
  levelInput = document.getElementById('level');
  levelInput.value = levelValue;
  levelInput.addEventListener('input', handleLevelInput);
});

// when user changes level...
function handleLevelInput() {
  // console.log('input level set to ' + this.value);
  levelValue = +this.value;
}

// when user clicks transform...
function handleTransform() {
  const str = document.getElementById("inputtext").value;
  const newstr = transform(str, levelValue);
  updateOutput(newstr);
}

function updateOutput(str) {
  const outputtext = document.getElementById("outputtext");
  outputtext.value = str;
}


// @codekit-append "travesty.js";