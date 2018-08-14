function decimalToBinary(num) {
  let binaryStr = '';
  while(num) {
      let remainder = num % 2;
      binaryStr = remainder + binaryStr;
      num = (num - remainder)/2;
  }
  return binaryStr;
}

function intersection (arrA, arrB) {
  const shared = [];
  let idxA = 0;
  let idxB = 0;
  while (idxA < arrA.length && idxB < arrB.length) {
    const elemA = arrA[idxA];
    const elemB = arrB[idxB];
    if (elemA == elemB) {
      shared.push(elemA);
    }
    if (elemA <= elemB) {
      idxA++;
    }
    if (elemA >= elemB) {
      idxB++;
    }
  }
  return shared;
}

function stringPermutations (str) {
  var results = [ ];
  var letters = str.split('');
  results.push([letters.shift()]); //add first letter (as an array) to results
  while (letters.length) {
    var curLetter = letters.shift();
    var tmpResults = [ ];
    results.forEach(function (curResult) {
      for (var i = 0; i<= curResult.length; i++) {
        var tmp = curResult.slice(); //make copy so we can modify it
        //insert the letter at the current position
        tmp.splice(i,0,curLetter);
        tmpResults.push(tmp);
      }
    });
    results = tmpResults; //overwrite the previous results
  }
  return results
    .map(function (letterArr) {
      return letterArr.join('');
    })
    .filter(function (el, index, self) {
      return self.indexOf(el) === index; //filter out non-unique words
    })
    .sort();
}

function findWordsStartingWith (book, prefix) {
  const text = book.toLowerCase();
  prefix = prefix.toLowerCase();
  const finds = [];

  for (let i = 0; i < text.length - prefix.length; i++) {
    if (i !== 0 && text[i - 1] !== ' ') continue;

    for (let j = 0; j < prefix.length; j++) {
      if (prefix[j] !== text[i + j]) break;
      if (j + 1 === prefix.length) {
        finds.push(i);
      }
    }
  }

  return finds;
 }
