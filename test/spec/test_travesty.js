import * as travesty from '../../src/travesty.js';
// let getUniqueMonths = days.getUniqueMonths;

let expect = chai.expect;

suite('Testing test_travesty.js', function() {
  
  suite('Testing level0', function() {
    var getUniqueMonthsArray = [
      {arr:[], str:'', testName:'empty str', newstr: ''},
    ];
    getUniqueMonthsArray.forEach(function(aTest) {
      if (!aTest.testName) aTest.testName = aTest.arr + ' -> ' + aTest.result;
    });
    getUniqueMonthsArray.forEach(function(aTest) {
      test(aTest.testName, function() {
        const newstr = travesty.level0(aTest.arr, aTest.str);
        expect(newstr.length).to.equal(aTest.newstr.length);
      });
    });
  });
  
});

