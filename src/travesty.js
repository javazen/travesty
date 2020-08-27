const TRACE = true;
const DEBUG = true;
const CHARS = "abcdefghijklmnopqrstuvwxyz '";

if (TRACE) console.log('travesty.js loaded');

// export function log(str) {
//   if (DEBUG) console.log(str);
// }

export function transform(str, order) {
  // clean the string of chars not in CHARS
  str = str.toLowerCase();
  str = str.replace(/[^a-zA-Z ']+/g,'');
  
  let newstr = '';
  const arr = CHARS.slice(0);
  // const arr = process(str);
  if (order === 0) {
    newstr = level0(arr, str);
    return newstr;
  } else if (order === 1) {
    newstr = level1(arr, str);
    return newstr;
  } else if (order === 2) {
    newstr = level2(arr, str);
    return newstr;
  } else if (order === 3) {
    newstr = level3(arr, str);
    return newstr;
  }
  
  return str;
}

// str should already have been cleaned, all chars should be in charsArr
function initDistArr(charsArr, str, order) {
  if (order === 1) {
    const distArr = Array(charsArr.length).fill(0);
    
    for (let i=0; i<str.length; i++) {
      const ch = str[i];
      const pos = charsArr.indexOf(ch);
      if (pos === -1) {
        if (DEBUG) console.log('bad ch= ' + ch);
      } else {
        distArr[pos] = distArr[pos] + 1;
      }
    }
    
    // more convenient to have a cumulative distribution
    let cumCount = 0;
    let cumDistArr = [];
    for (let i=0; i<distArr.length; i++) {
      const currentCount = distArr[i];
      cumCount += currentCount;
      cumDistArr.push(cumCount);
    }
    return cumDistArr;
  } 
  /*
  else if (order === 2) {
    
  }
  */
}

// export function process(str) {
//   let arr = [];
// 
//   return arr;
// }

export function level0(arr, str) {
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
  const len = str.length;

  // first get the distribution
  const cumDistArr1 = initDistArr(charsArr, str, 1);

  // use it to generate a new string at random
  let newstr = 'L1 ';
  for (let i=0; i<len; i++) {
    const n = Math.floor((len+1) * Math.random());
    const pos = cumDistArr1.findIndex(element => element >= n);
    const ch = charsArr[pos];
    // console.log('n= ' + n + ' pos= ' + pos + ' ch= ' + ch);
    newstr += ch;
  }
  
  return newstr;
}

function level2(charsArr, str) {
  const len = str.length;
  
  // first get the distribution
  // const cumDistArr1 = initDistArr(charsArr, str, 1);
  // const cumDistArr2 = initDistArr(charsArr, str, 2);

  // first get the distribution
  const distArr1 = Array(charsArr.length).fill(0);
  const distArr2 = [];
  for (let i=0; i<charsArr.length; i++) {
    distArr2.push(distArr1.slice(0));
  }
  for (let i=1; i<len; i++) {
    const prevch = str[i-1];
    const prevpos = CHARS.indexOf(prevch);
    if (prevpos !== -1) {
      const row = distArr2[prevpos];
      const ch = str[i];
      const pos = CHARS.indexOf(ch);
      if (pos !== -1) row[pos] = row[pos] + 1;
    }
  }
  // more convenient to have a cumulative distribution
  for (let i=0; i<charsArr.length; i++) {
    const row = distArr2[i].slice(0);
    let cumCount = 0;
    for (let j=0; j<distArr2.length; j++) {
      const currentCount = row[j];
      cumCount += currentCount;
      distArr2[i][j] = cumCount;
    }
  }
  // get (cumulative) row totals
  const rowTotals = [];
  for (let i=0; i<charsArr.length; i++) {
    rowTotals.push(distArr2[i][charsArr.length-1]);
  }
  const cumRowTotals = [];
  let cumCount = 0;
  for (let i=0; i<charsArr.length; i++) {
    const currentCount = rowTotals[i];
    cumCount += currentCount;
    cumRowTotals[i] = cumCount;
  }
  
  let n, pos, prevch, newstr = 'L2:  ';
  n = Math.floor((len+1) * Math.random());
  const fn = element => element >= n;
  pos = cumRowTotals.findIndex(fn);
  prevch = charsArr[pos];
  newstr += prevch;
  for (let i=1; i<len; i++) {
    let prevpos = CHARS.indexOf(prevch);
    let rowtot = rowTotals[prevpos];
    n = Math.floor((rowtot+1) * Math.random());
    pos = distArr2[prevpos].findIndex(fn);
    prevch = charsArr[pos];
    newstr += prevch;
  }
  
  return newstr;
}

function level3(charsArr, str) {
  const len = str.length;
  
  // first get the distribution
  const distArr1 = Array(charsArr.length).fill(0);
  const distArr3 = [];
  for (let i=0; i<charsArr.length; i++) {
    let distArr2 = [];
    for (let j=0; j<charsArr.length; j++) {
      distArr2.push(distArr1.slice(0));
    }
    distArr3.push(distArr2);
  }
  
  for (let i=2; i<len; i++) {
    const prevprevch = str[i-2];
    const prevprevpos = CHARS.indexOf(prevprevch);
    if (prevprevpos !== -1) {
      const plane = distArr3[prevprevpos];
      const prevch = str[i-1];
      const prevpos = CHARS.indexOf(prevch);
      if (prevpos !== -1) {
        const row = plane[prevpos];
        const ch = str[i];
        const pos = CHARS.indexOf(ch);
        if (pos !== -1) row[pos] = row[pos] + 1;
      }
    }
  }
  
  // more convenient to have a cumulative distribution
  for (let i=0; i<distArr3.length; i++) {
    const plane = distArr3[i].slice(0);
    for (let j=0; j<plane.length; j++) {
      const row = plane[j].slice(0);
      let cumCount = 0;
      for (let k=0; k<row.length; k++) {
        const currentCount = row[k];
        cumCount += currentCount;
        distArr3[i][j][k] = cumCount;
      }
    }
  }
  
  /*
  // get (cumulative) row totals
  const rowTotals = [];
  for (let i=0; i<charsArr.length; i++) {
    rowTotals.push(distArr2[i][charsArr.length-1]);
  }
  const cumRowTotals = [];
  let cumCount = 0;
  for (let i=0; i<charsArr.length; i++) {
    const currentCount = rowTotals[i];
    cumCount += currentCount;
    cumRowTotals[i] = cumCount;
  }
  
  let n, pos, prevch, newstr = 'L2:  ';
  n = Math.floor((len+1) * Math.random());
  const fn = element => element >= n;
  pos = cumRowTotals.findIndex(fn);
  prevch = charsArr[pos];
  newstr += prevch;
  for (let i=1; i<len; i++) {
    let prevpos = CHARS.indexOf(prevch);
    let rowtot = rowTotals[prevpos];
    n = Math.floor((rowtot+1) * Math.random());
    pos = distArr2[prevpos].findIndex(fn);
    prevch = charsArr[pos];
    newstr += prevch;
  }
  return newstr;
  */
  
  return str;
}

