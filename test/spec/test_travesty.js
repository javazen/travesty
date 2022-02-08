import * as travesty from '../../src/travesty.js';

let assert = chai.assert;
let expect = chai.expect;

suite('Testing test_travesty.js', function() {
  
  suite('Testing randomize', function() {
    var randomizeArray = [
      // {level:0, str:'', testName:'empty str', result: ''}, // no value of level works with empty string
      {level:0, str:'abcde', result: 'abcde'},
      {level:0, str:'aabcaadeaa', result: 'abcdeabcde'},
      {level:1, str:'aabcaadeaa', result: 'abcdeabcde'},
    ];
    randomizeArray.forEach(function(aTest) {
      if (!aTest.testName) aTest.testName = 'L' + aTest.level + ' ' + aTest.str + ' -> ' + aTest.result;
    });
    randomizeArray.forEach(function(aTest) {
      test(aTest.testName, function() {
        const newstr = travesty.randomize(aTest.str, aTest.level);
        expect(newstr.length).to.equal(aTest.result.length);
        assert( travesty.sanityCheck(newstr) );
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

