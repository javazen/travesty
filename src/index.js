import {transform} from './travesty.js';

const TRACE = true;
const DEBUG = true;

let transformBtn;

if (TRACE) console.log('index.js loaded');

document.addEventListener("DOMContentLoaded", function(event) {
  if (TRACE) console.log('DOMContentLoaded');
  transformBtn = document.getElementById("transform");
  transformBtn.addEventListener('click', handleTransform);
});

// when user clicks transform...
function handleTransform() {
  const str = document.getElementById("inputtext").value;
  const newstr = transform(str, 0);
  updateOutput(newstr);
}

function updateOutput(str) {
  const outputtext = document.getElementById("outputtext");
  outputtext.value = str;
}


// @codekit-append "travesty.js";