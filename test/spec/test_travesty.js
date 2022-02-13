import * as travesty from '../../src/travesty.js';

let assert = chai.assert;
let expect = chai.expect;

suite('Testing test_travesty.js', function() {
  
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
      // L2
      {str:'a stitch in time', prefix:'a', result: ' '},
      {str:'a stitch in time', prefix:' ', result: 'sit'},
      {str:'a stitch in time', prefix:'s', result: 't'},
      {str:'a stitch in time', prefix:'t', result: 'ici'},
      {str:'a stitch in time', prefix:'i', result: 'tnm'},
      {str:'a stitch in time', prefix:'e', result: ''}, // e is only at the end, no following char
      {str:'a stitch in time', prefix:'z', result: ''}, // z is NOT in the string
      // L3
      {str:'a stitch in time', prefix:'a ', result: 's'},
      {str:'a stitch in time', prefix:' s', result: 't'},
      {str:'a stitch in time', prefix:'st', result: 'i'},
      {str:'a stitch in time', prefix:'ti', result: 'tm'},
      {str:'a stitch in time', prefix:'me', result: ''}, // me is only at the end, no following char
      // L4
      {str:'a stitch in time', prefix:'a s', result: 't'},
      {str:'a stitch in time', prefix:'tim', result: 'e'},
      {str:'a stitch in time', prefix:'ime', result: ''}, // ime is only at the end, no following char
      {str:'a stitch in time', prefix:'zzz', result: ''}, // zzz is NOT in the string
    ];
    getFollowingCharsStringArray.forEach(function(aTest) {
      if (!aTest.testName) aTest.testName = '"' + aTest.str + '" ' + aTest.prefix + ' -> "' + aTest.result + '"';
    });
    getFollowingCharsStringArray.forEach(function(aTest) {
      test(aTest.testName, function() {
        const followChars = travesty.getFollowingCharsString(aTest.str, aTest.prefix);
        expect(followChars).to.equal(aTest.result);
      });
    });
  });

  suite('Testing transform', function() {
    var transformArray = [
      // {level:0, str:'', testName:'empty str', result: ''}, // no value of level works with empty string
      {level:0, str:'abcde', result: 'abcde'},
      {level:0, str:'aabcaadeaa', result: 'abcdeabcde'},
      {level:1, str:'aabcaadeaa', result: 'abcdeabcde'},
      {level:2, str:'abc', result: 'bac'},
      {level:2, str:'try a stitch in time', result: 'try a stitch in time'},
      {level:3, str:'try a stitch in time', result: 'try a stitch in time'},
    ];
    transformArray.forEach(function(aTest) {
      if (!aTest.testName) aTest.testName = 'L' + aTest.level + ' ' + aTest.str + ' -> ' + aTest.result;
    });
    transformArray.forEach(function(aTest) {
      test(aTest.testName, function() {
        const newstr = travesty.transform(aTest.str, aTest.level);
        expect(newstr.length).to.equal(aTest.result.length);
        assert( travesty.sanityCheck(newstr) );
      });
    });
  });

});
