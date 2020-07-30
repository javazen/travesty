const TRACE = true;
const DEBUG = true;
const CHARS = "abcdefghijklmnopqrstuvwxyz '";

if (TRACE) console.log('travesty.js loaded');

export function log(str) {
  if (DEBUG) console.log(str);
}

export function transform(str, order) {
  let newstr = '';
  // const arr = process(str);
  if (order === 0) {
    const arr = CHARS.slice(0);
    newstr = level0(arr, str);
    return newstr;
  }
  
  return str;
}

// export function process(str) {
//   let arr = [];
// 
//   return arr;
// }

function level0(arr, str) {
  const len = str.length;
  let newstr = '';
  for (let i=0; i<len; i++) {
    const n = Math.floor(arr.length * Math.random());
    const ch = arr[n];
    newstr += ch;
  }
  
  return newstr;
}
