const TRACE = true;
//const DEBUG = true;
const MOCK_RANDOM = false;

const CHARS = "abcdefghijklmnopqrstuvwxyz '";

const R = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
let rIndex = 0;

// In the unlikely event this is run in a REALLY old browser that does not support console.log
if (!window.console) { window.console = { log: function(){} }; }

if (TRACE) console.log('travesty.js loaded');

// export function log(str) {
//   if (DEBUG) console.log(str);
// }

export function transform(str, order) {
  // clean the string of disallowed chars
  str = cleanStr(str);
  
  let newstr = randomize(str, order);
  
  return newstr;
}

// maybe we could replace á with a, etc. before doing the regex replace below
function cleanStr(str) {
  let newstr = str.toLowerCase();
  newstr = newstr.replace(/[^a-zA-Z ']+/g,'');
  return newstr;
}

export function randomize(str, order) {
  const len = str.length;
  if (order < 0 || order >= len)
    return 'order must be a non-negative integer less than the length of the text';
  
  let newstr = 'L' + order + '->';
  
  const arr = CHARS.slice(0);
  if (order === 0) {
    newstr += level0(arr, str);
  } else if (order === 1) {
    newstr += level1(str);
  } else if (order === 2) {
    newstr += level2(str);
  } else if (order === 3) {
    newstr += level3(str);
  } else if (order === 4) {
    newstr += level4(str);
  }
  
  return newstr;
}



function random(seed) {
  if (MOCK_RANDOM) {
    if (seed) rIndex = seed;
    rIndex++;
    if (rIndex >= R.length) rIndex = 0;
    return R[rIndex];
  }

  return Math.random();
}

export function level0(arr, str) {
  let newstr = 'L0:  ';
  for (let i=0; i<str.length; i++) {
    const ch = pickCharAtRandom(arr);
    newstr += ch;
  }
  
  return newstr;
}

// may want to make sure we do not start with a blank
function level1(str) {
  const len = str.length;

  // use it to generate a new string of chars selected at random
  let newstr = '';
  for (let i=0; i<len; i++) {
    const ch = pickCharAtRandom(str);
    newstr += ch;
  }
  
  return newstr;
}

function pickCharAtRandom(str) {
  const pos = Math.floor((str.length) * random());
  return str[pos];
}

// make a string of all the chars that can follow the specified prefix
function getFollowingCharsString(str, prefix) {
  let followChars = '';

  let oldpos = 0;
  let pos;
  do {
    pos = str.indexOf(prefix, oldpos);
    let newpos = pos + prefix.length;
    if (newpos >= str.length) 
      break; // there is no following char in this case
    if (pos !== -1) {
      followChars += str[newpos];
      oldpos = newpos;
    }
  } while (pos > -1);

  return followChars;
}

function level2(str) {
  const len = str.length;

  // pick the first character as in level1
  let currentChar = pickCharAtRandom(str);
  let newstr = currentChar;

  for (let i=0; i<len-1; i++) {
    // find all the characters that follow the latest character
    let followChars = getFollowingCharsString(str, currentChar);

    // randomly pick one of the following chars
    currentChar = pickCharAtRandom(followChars);
    newstr += currentChar;
  }

  return newstr;
}

function level3(str) {
  const len = str.length;

  // pick the first character as in level1
  let currentChar = pickCharAtRandom(str);
  let newstr = currentChar;

  // pick the second character as in level2
  let followChars = getFollowingCharsString(str, currentChar);
  currentChar = pickCharAtRandom(followChars);
  newstr += currentChar;

  // and now all the rest
  for (let i=0; i<len-2; i++) {
    // find all the characters that follow the last 2 characters
    let prefix = newstr.slice(-2);
    followChars = getFollowingCharsString(str, prefix);

    // randomly pick one of the following chars
    currentChar = pickCharAtRandom(followChars);
    newstr += currentChar;
  }

  return newstr;
}

function level4(str) {
  const len = str.length;

  // pick the first character as in level1
  let currentChar = pickCharAtRandom(str);
  let newstr = currentChar;

  // pick the second character as in level2
  let followChars = getFollowingCharsString(str, currentChar);
  currentChar = pickCharAtRandom(followChars);
  newstr += currentChar;

  // pick the third character as in level3
  let prefix = newstr.slice(-2);
  followChars = getFollowingCharsString(str, prefix);
  currentChar = pickCharAtRandom(followChars);
  newstr += currentChar;

  // and now all the rest
  for (let i=0; i<len-3; i++) {
    // find all the characters that follow the last 2 characters
    prefix = newstr.slice(-3);
    followChars = getFollowingCharsString(str, prefix);

    // randomly pick one of the following chars
    currentChar = pickCharAtRandom(followChars);
    newstr += currentChar;
  }

  return newstr;
}
