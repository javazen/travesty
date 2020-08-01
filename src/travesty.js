const TRACE = true;
const DEBUG = true;
const CHARS = "abcdefghijklmnopqrstuvwxyz '";

if (TRACE) console.log('travesty.js loaded');

export function log(str) {
  if (DEBUG) console.log(str);
}

export function transform(str, order) {
  let newstr = '';
  const arr = CHARS.slice(0);
  // const arr = process(str);
  if (order === 0) {
    newstr = level0(arr, str);
    return newstr;
  } else if (order === 1) {
    newstr = level1(arr, str);
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

function level1(charsArr, str) {
  str = str.toLowerCase();
  const len = str.length; // 36

  // first get the distribution
  const distArr = Array(charsArr.length).fill(0); // [3,1,0,...]
  for (let i=0; i<len; i++) {
    const ch = str[i];
    const pos = CHARS.indexOf(ch);
    if (pos === -1)
      console.log('huh?');
    else
      distArr[pos] = distArr[pos] + 1;
  }
  // more convenient to have a cumulative distribution
  let cumCount = 0;
  let cumDistArr = [];
  for (let i=0; i<distArr.length; i++) {          // [3,4,4,...]
    const currentCount = distArr[i];
    cumCount += currentCount;
    cumDistArr.push(cumCount);
  }

  let newstr = 'L1 ';
  for (let i=0; i<len; i++) {
    const n = Math.floor((len+1) * Math.random());
    const pos = cumDistArr.findIndex(element => element >= n);
    const ch = charsArr[pos];
    // console.log('n= ' + n + ' pos= ' + pos + ' ch= ' + ch);
    newstr += ch;
  }
  
  return newstr;
}
