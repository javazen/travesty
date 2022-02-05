import * as travesty from '../../src/travesty.js';
const CHARS = "abcdefghijklmnopqrstuvwxyz '";

let expect = chai.expect;

suite('Testing test_travesty.js', function() {
  
  suite('Testing level0', function() {
    var level0Array = [
      {arr:[], str:'', testName:'empty str', newstr: ''},
    ];
    level0Array.forEach(function(aTest) {
      if (!aTest.testName) aTest.testName = aTest.str + ' -> ' + aTest.result;
    });
    level0Array.forEach(function(aTest) {
      test(aTest.testName, function() {
        const arr = (aTest.arr) ? aTest.arr : CHARS;
        const newstr = travesty.randomizeLevel0(arr, aTest.str);
        expect(newstr).to.equal(aTest.newstr);
        const newstrCleaned = newstr.toLowerCase().trim();
        expect(newstrCleaned).to.equal(newstr);
      });
    });
  });
  
  /*
  suite('Testing level1', function() {
    var level1Array = [
      {str:'The race is not always to the strong', testName:'empty str', newstr: ''},
    ];
    level1Array.forEach(function(aTest) {
      if (!aTest.testName) aTest.testName = aTest.str + ' -> ' + aTest.result;
    });
    level1Array.forEach(function(aTest) {
      test(aTest.testName, function() {
        const newstr = travesty.randomizeLevel1(aTest.arr, aTest.str);
        expect(newstr.length).to.equal(aTest.newstr.length);
        expect(newstr).to.equal(aTest.newstr);
      });
    });
  });
  */

});

