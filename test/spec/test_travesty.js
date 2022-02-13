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

  suite('Testing cleanStr', function() {
    var cleanStrArray = [
      {str:'', result: ''},
      {str:'a', result: 'a'},
      {str:'a3', result: 'a '},
      {str:'3a', result: ' a'},
      {str:'3a2', result: ' a '},
      {str:'32a', result: ' a'},
      {str:'3a2 ', result: ' a '},
      // non-Latin chars
      {str:'Á', result: 'a'},
      {str:'á', result: 'a'},
      {str:'à', result: 'a'},
      {str:'ñ', result: 'n'},
      {str:'Él está en el baño', result: 'el esta en el bano'},
      
    ];
    cleanStrArray.forEach(function(aTest) {
      if (!aTest.testName) aTest.testName = '"' + aTest.str + '" -> "' + aTest.result + '"';
    });
    cleanStrArray.forEach(function(aTest) {
      test(aTest.testName, function() {
        const newstr = travesty.cleanStr(aTest.str);
        expect(newstr).to.equal(aTest.result);
      });
    });
  });

  suite('Testing getFollowingCharsString', function() {
    var getFollowingCharsStringArray = [
      // L1
      {str:'a stitch in time', prefix:'a', result: ' '},
      {str:'a stitch in time', prefix:' ', result: 'sit'},
      {str:'a stitch in time', prefix:'s', result: 't'},
      {str:'a stitch in time', prefix:'t', result: 'ici'},
      {str:'a stitch in time', prefix:'i', result: 'tnm'},
      {str:'a stitch in time', prefix:'z', result: ''}, // z is NOT in the string
      // L2
      {str:'a stitch in time', prefix:'a ', result: 's'},
      {str:'a stitch in time', prefix:' s', result: 't'},
      {str:'a stitch in time', prefix:'st', result: 'i'},
      {str:'a stitch in time', prefix:'ti', result: 'tm'},
      // L2
      {str:'it is not the critic', prefix:' t', result: 'h'},
    ];
    getFollowingCharsStringArray.forEach(function(aTest) {
      if (!aTest.testName) aTest.testName = aTest.str + ' ' + aTest.prefix + ' -> ' + aTest.result;
    });
    getFollowingCharsStringArray.forEach(function(aTest) {
      test(aTest.testName, function() {
        const followChars = travesty.getFollowingCharsString(aTest.str, aTest.prefix);
        expect(followChars).to.equal(aTest.result);
      });
    });
  });

});

