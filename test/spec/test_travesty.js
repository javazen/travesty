import * as travesty from '../../src/travesty.js';

let assert = chai.assert;
let expect = chai.expect;

suite('Testing test_travesty.js', function() {
  
  suite('Testing level0', function() {
    var level0Array = [
      {str:'', testName:'empty str', result: ''},
      {str:'abcde', result: 'abcde'},
      {str:'aabcaadeaa', result: 'abcdeabcde'},
    ];
    level0Array.forEach(function(aTest) {
      if (!aTest.testName) aTest.testName = aTest.str + ' -> ' + aTest.result;
    });
    level0Array.forEach(function(aTest) {
      test(aTest.testName, function() {
        const newstr = travesty.randomizeLevel0(aTest.str);
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

