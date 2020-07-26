const TRACE = true;
const DEBUG = true;
const CHARS = "abcdefghijklmnopqrstuvwxyz '";

if (TRACE) console.log('travesty.js loaded');

export function log(str) {
  if (DEBUG) console.log(str);
}

export function transform(str, order) {
  let newstr = '';
  const arr = process(str);
  
  return str;
}

export function process(str) {
  let arr = [];
  
  return arr;
}
