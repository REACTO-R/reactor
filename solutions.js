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


function intersect (arrOne, arrTwo) {
  const shared = [];
  let idxOne = 0;
  let idxTwo = 0;
  while (idxOne < arrOne.length && idxTwo < arrTwo.length) {
    const elemOne = arrOne[idxOne];
    const elemTwo = arrTwo[idxTwo];
    if (elemOne == elemTwo) {
      shared.push(elemOne);
    }
    if (elemOne <= elemTwo) {
      idxOne++;
    }
    if (elemOne >= elemTwo) {
      idxTwo++;
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

function findWordsStartingWith(book, prefix) {
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

const doesPathExist = (graph, start, target, visited = {}) => {
  if (!graph[start]) return false
  visited[start] = true;

  return graph[start].some((vertex) => {
    if (vertex === target) return true;
    if (!visited[vertex]) {
      return doesPathExist(graph, vertex, target, visited);
    } else {
      return false;
    }
  });
}

function subsetSum (target, nums, idx = 0, memo = {}) {
  // if we've seen this target and already solved for it, return the answer right away
  if (memo.hasOwnProperty(target)) return memo[target];
  // if we've hit 0 we're done!
  if (target === 0) return true;
  // stop trying and return false if the target is negative OR if we've reached the end of the array
  if (target < 0 || idx === nums.length) return false;
  const num = nums[idx];
  // capture the boolean result for the possibility of *excluding* the current number from the sum
  // recursively try with the same target, but continue onto the next index
  const whenExcluded = subsetSum(target, nums, idx + 1, memo);
  // capture the boolean result for the possibility of *including* the current number in the sum
  // recursively try with the target minus this number and continue onto the next index
  const whenIncluded = subsetSum(target - num, nums, idx + 1, memo);
  // determine whether either possibility came back true
  const result = whenExcluded || whenIncluded;
  // cache this answer, associating it with this particular target
  memo[target] = result;
  return result;
}

doesPathExist = (graph, start, target, visited = {}) => {
  if (!graph[start]) return false
  visited[start] = true;

  return graph[start].some((vertex) => {
    if (vertex === target) return true;
    if (!visited[vertex]) {
      return doesPathExist(graph, vertex, target, visited);
    } else {
      return false;
    }
  });
}
