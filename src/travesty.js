const TRACE = true;
//const DEBUG = true;
const MOCK_RANDOM = false;

const CHARS = "abcdefghijklmnopqrstuvwxyz '";

const R = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
let rIndex = 0;

// In the unlikely event this is run in a REALLY old browser that does not support console.log
if (!window.console) { window.console = { log: function(){} }; }

if (TRACE) console.log('travesty.js loaded');

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

export function getOutputTooltip(order) {
  let title = 'transformed to level ' + order;
  return title;
}

export function randomize(str, order) {
  const len = str.length;
  const orderOK = checkOrder(order, len);
  if (!orderOK)
    return 'order must be a non-negative integer less than the length of the text';
  
  // let newstr = 'L' + order + '->';
  let newstr = '';
  
  const arr = CHARS.slice(0);
  if (order === 0) {
    newstr += randomizeLevel0(arr, str);
  } else if (order === 1) {
    newstr += randomizeLevel1(str);
  } else if (order < 8) {
    newstr += randomizeHigherLevels(str, order);
  } 
  
  return newstr;
}

function checkOrder(order, len) {
  // we can't allow negative order, or order >= len
  let ok = (order >= 0 && order < len);
  // since it gets less interesting around order 7 or 8, maybe restrict this?
  return ok;
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

export function randomizeLevel0(arr, str) {
  let newstr = '';
  for (let i=0; i<str.length; i++) {
    const ch = pickCharAtRandom(arr);
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

  // Returning '' causes problems, so just choose a char at random here
  if (followChars === '') followChars += pickCharAtRandom(str);

  return followChars;
}

// may want to make sure we do not start with a blank
function randomizeLevel1(str) {
  const len = str.length;

  // use it to generate a new string of chars selected at random
  let newstr = '';
  for (let i=0; i<len; i++) {
    const ch = pickCharAtRandom(str);
    newstr += ch;
  }
  
  return newstr;
}

function randomizeHigherLevels(str, order) {
  // Get the first (order-1) chars, the ones without full (order-1) length prefixes
  let newstr = getInitialPart(str, order);

  // and now all the rest
  newstr = getMainPart(str, order, newstr);

  return newstr;
}

// return the first initialCharsCount chars, chosen randomly given the
// context of successively longer prefixes
function getInitialPart(str, order) {
  let prefix, followChars, currentChar, newstr = '';
  const initialCharsCount = order - 1;

  for (let i=0; i<initialCharsCount; i++) {
    if (i === 0) {
      currentChar = pickCharAtRandom(str);
    } else {
      prefix = newstr.slice(-i);
      followChars = getFollowingCharsString(str, prefix);
      currentChar = pickCharAtRandom(followChars);
    }
    newstr += currentChar;
  }

  return newstr;
}

function getMainPart(str, order, newstr) {
  let prefix, followChars, currentChar;

  const initialCharsCount = order - 1;
  const loopCount = str.length - initialCharsCount;
  for (let i=0; i<loopCount; i++) {
    // find all the characters that follow the last initialCharsCount characters
    prefix = newstr.slice(-initialCharsCount);
    followChars = getFollowingCharsString(str, prefix);

    // randomly pick one of the following chars
    currentChar = pickCharAtRandom(followChars);
    newstr += currentChar;
  }

  return newstr;
}
