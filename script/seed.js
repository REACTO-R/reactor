'use strict'

const db = require('../server/db')
const {
  User,
  MainTopic,
  SubTopic,
  Question,
  QuestionList,
  RQuestion,
  EQuestion,
  AQuestion,
  CTStuff
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  /*
  Terms are as follows:
  mainTopic# = the main topic
  mYsubTopic# = sub topic # of main topic Y
  mXsYQuestion# = Question # of sub topic Y of main topic X : m1s1Question1 is question 1 of sub topic 1 of topic 1
  mXsYQZR# = R Question # of question Z, sub topic Y, main topic X.
  Repeat for E and A as well.
  mXsYQZCT = CTStuff for question Z of subtopic Y, main X.

  It"s complicated, but we"ll need it once we want multiple topics, subtopics, and questions.
  */

  let mainTopic1 = await MainTopic.create({name: 'Implementing Functions'})
  let m1subTopic1 = await SubTopic.create({name: 'Intercept'})
  let m1s1Question1 = await Question.create({
    text:
      'Given two sorted arrays of numbers, return an array containing all values that appear in both arrays. The numbers in the resulting array (the "intersection") may be returned in any order, they needn"t be sorted.'
  })
  let m1s1Q1QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What is the question asking for?',
    EQuestion:
      'Example: What would the function return for these two arrays? [0,1,2,3,4,5,6] , [2,4,6,8]',
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'Consider the following: The two arrays are sorted, can this assist in our solution? Can parsing one element allow us to avoid parsing others?'
  })
  let m1s1Q1R1 = await RQuestion.create({
    correct: true,
    answerText: 'An array of all elements that are present in both arrays.',
    explanationText:
      'Correct! We want to find the intersection of the two arrays: elements that both arrays share.'
  })
  let m1s1Q1R2 = await RQuestion.create({
    correct: false,
    answerText:
      'Return a new sorted array with all the elements from both arrays.',
    explanationText: 'Incorrect: The question only asks for the “intersection”.'
  })
  let m1s1Q1R3 = await RQuestion.create({
    correct: false,
    answerText: 'An sorted array with duplicates from both arrays.',
    explanationText: 'Incorrect: the answer array does not need to be sorted.'
  })
  let m1s1Q1E1 = await EQuestion.create({
    correct: true,
    answerText: '[2,4,6]',
    explanationText:
      'Correct! As 2, 4, and 6 are present in both arrays, we want to return the array with those values.'
  })
  let m1s1Q1E2 = await EQuestion.create({
    correct: false,
    answerText: '[12]',
    explanationText:
      'Incorrect. This would be the sum of all intersecting elements.'
  })
  let m1s1Q1E3 = await EQuestion.create({
    correct: false,
    answerText: '[0,1,3,5,8]',
    explanationText:
      'Not quite right. This is the opposite of what we’re intending to search for, and would be the array of all elements that aren’t present in both arrays.'
  })
  let m1s1Q1A1 = await AQuestion.create({
    correct: true,
    answerText:
      'Assign one array to a hash table, and parse the other array through it, returning values that match.',
    explanationText:
      'While this is an efficient time solution, you would need to store the hash table of the array, increasing size complexity.',
    optimizationText:
      'You used a hash table to solve this problem. Your solution is time-optimal at O(n+m), but requires an additional O(m) of space.',
    optimizationGraph: `{"label": "O(n+m)","borderDash": [5,20],"data": [0, 5, 10, 15, 20, 25], "backgroundColor":"rgba(0, 0, 0, 0)", "borderColor": "rgba(255,0,0,1)", "borderWidth": 1}`
  })
  let m1s1Q1A2 = await AQuestion.create({
    correct: true,
    answerText:
      'Do a for loop for each element, comparing an element in array 1 with each element in array.',
    explanationText:
      'This would work, however, it would be rather inefficient, as you would need to parse all elements in array 1 for each element in array 2.',
    optimizationText:
      'You choose to use nested for loops, therefore the run time of your program would be O(n*m) because for every element in N you would need to loop through all of M.',
    optimizationCode: `function intersection (arrA, arrB) {
      let solutionArr = [];
      for (let i = 0; i< arrA.length; i++) {
        for (let j = 0; j< arrB.length; j++) {
          if (arrA[i] === arrB[j]) {
            solutionArr.push(arrA[i])
          }
        }
      }
      return solutionArr;
    }
    `,
    optimizationGraph: `{"label": "O(n*m)","borderDash": [5,20],"data": [0, 25, 100, 225, 400, 625],"backgroundColor":"rgba(0, 0, 0, 0)","borderColor": "rgba(255,0,0,1)","borderWidth": 1}`
  })
  let m1s1Q1A3 = await AQuestion.create({
    correct: true,
    answerText:
      'Point to two different index values of the array, and only the index where the selected element is lesser. Increment both and save the value if they match.',
    explanationText:
      'Correct! This is the most efficient solution for both time and space for this problem.',
    optimizationText:
      'You used pointers to iterate through the loop, great! This solution would be O(n+m).',
    optimizationCode: `function intersection (arrA, arrB) {
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
}`,
    optimizationGraph: `{"label": "O(n+m)","borderDash": [5,20],"data": [0, 5, 10, 15, 20, 25], "backgroundColor":"rgba(0, 0, 0, 0)", "borderColor": "rgba(255,0,0,1)", "borderWidth": 1}`
  })
  let m1s1Q1CT1 = await CTStuff.create({
    Input: '[[0,1,2,3,4,5,6], [2,4,6,8]]',
    Output: '[2,4,6]'
  })
  let m1s1Q1CT2 = await CTStuff.create({
    Input: '[[0,1,2,3], [4,5,6,7,8]]',
    Output: '[]'
  })
  let m1s1Q1CT3 = await CTStuff.create({
    Input: '[[4, 8, 15, 16, 23, 42], [2, 4, 8, 16, 32, 64]]',
    Output: '[4,8,16]'
  })

  //Subtopic 2
  let m1subTopic2 = await SubTopic.create({name: 'String Permutations'})
  let m1s2Question1 = await Question.create({
    text:
      'Given a string, return an array of all the permutations of that string. The permutations of the string should be the same length as the original string (i.e. use each letter in the string exactly once) but do not need to be actual words.'
  })
  let m1s2Q1QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What would be all the permutations of a string?',
    EQuestion:
      'Example: Given the string "app", what would the function return?',
    AQuestion: 'Approach: What would be the best approach to this problem?',
    AQuestionConsideration:
      'Don"t think too much about optmiziation. We have to go through all elements of the string no matter what.'
  })
  let m1s2Q1R1 = await RQuestion.create({
    correct: false,
    answerText:
      'An array with the amount of times each letter shows up in the string.',
    explanationText: 'Incorrect. That would be the frequency.'
  })
  let m1s2Q1R2 = await RQuestion.create({
    correct: true,
    answerText: 'An array with all the ways the characters could be arranged',
    explanationText:
      'Correct! Permuations of "are" would include "rea" and "ear".'
  })
  let m1s2Q1R3 = await RQuestion.create({
    correct: false,
    answerText: 'An array with all the different meanings the word could have.',
    explanationText: 'Incorrect. That would be the word"s definition.'
  })
  let m1s2Q1E1 = await EQuestion.create({
    correct: false,
    answerText: '["app", "pap", "ppa", "app", "pap", "ppa"]',
    explanationText:
      'Not quite right, the function should be able to deal with duplicates, and the answer should only have unique values.'
  })
  let m1s2Q1E2 = await EQuestion.create({
    correct: false,
    answerText: '["ppa", "pap", "app"]',
    explanationText:
      'Close! However, the function should return the values of the array in alphabetical order.'
  })
  let m1s2Q1E3 = await EQuestion.create({
    correct: true,
    answerText: '["app", "pap", "ppa"]',
    explanationText: 'That"s right!'
  })
  let m1s2Q1A1 = await AQuestion.create({
    correct: true,
    answerText:
      'Iteratively go through the string and note down each permutation sans duplicates, then sort.',
    explanationText:
      'Yep. When dealing with permutations, there tends not to be any efficient way except for going through each permutation.',
    optimizationText:
      'As stated before, this function will always be some form of O(n!).',
    optimizationCode: `function stringPermutations (str) {
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
}`
  })
  let m1s2Q1CT1 = await CTStuff.create({
    Input: '["app"]',
    Output: '["app", "pap", "ppa"]'
  })
  let m1s2Q1CT2 = await CTStuff.create({
    Input: '["lll"]',
    Output: '["lll"]'
  })
  let m1s2Q1CT3 = await CTStuff.create({
    Input: '["one"]',
    Output: '["eno", "eon", "neo", "noe", "oen", "one"]'
  })

  await mainTopic1.addSubTopic(m1subTopic1) //Assign subtopic to main topic
  await m1subTopic1.addQuestion(m1s1Question1) //Assign question to subtopic
  await m1s1Question1.setQuestionList(m1s1Q1QuestionList) //Assign question list to question
  await m1s1Q1QuestionList.addRQuestion([m1s1Q1R1, m1s1Q1R2, m1s1Q1R3]) //Assign REA questions to question list
  await m1s1Q1QuestionList.addEQuestion([m1s1Q1E1, m1s1Q1E2, m1s1Q1E3])
  await m1s1Q1QuestionList.addAQuestion([m1s1Q1A1, m1s1Q1A2, m1s1Q1A3])
  await m1s1Question1.addCTStuff([m1s1Q1CT1, m1s1Q1CT2, m1s1Q1CT3]) //Assign CTStuff to Question

  await mainTopic1.addSubTopic(m1subTopic2)
  await m1subTopic2.addQuestion(m1s2Question1)
  await m1s2Question1.setQuestionList(m1s2Q1QuestionList)
  await m1s2Q1QuestionList.addRQuestion([m1s2Q1R1, m1s2Q1R2, m1s2Q1R3])
  await m1s2Q1QuestionList.addEQuestion([m1s2Q1E1, m1s2Q1E2, m1s2Q1E3])
  await m1s2Q1QuestionList.addAQuestion([m1s2Q1A1])
  await m1s2Question1.addCTStuff([m1s2Q1CT1, m1s2Q1CT2, m1s2Q1CT3])

  //Topic 2

  let mainTopic2 = await MainTopic.create({name: 'Data Structures'})
  let m2subTopic1 = await SubTopic.create({name: 'Data Trees'})
  let m2s1Question1 = await Question.create({
    text:
      'Given a "book" and a string to search for, return an array of the character indices for every word in the book that begins with that string.'
  })
  let m2s1Q1QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What is the question asking for?',
    EQuestion:
      'Example: What would the function return with inputs "She sells seashells by the sea shore?", "se"?',
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'It"d take quite a while to simply parse through the string. Perhaps storing the book string in a different form would help?'
  })
  let m2s1Q1R1 = await RQuestion.create({
    correct: true,
    answerText: 'The indices within the book that start with the given string.',
    explanationText:
      'That"s it! If a word starts with the string, we want to know where to find it.'
  })
  let m2s1Q1R2 = await RQuestion.create({
    correct: false,
    answerText: 'The words within the book that contain the given string.',
    explanationText:
      'Not quite right. The question is asking for the indicies of those words, not the words themselves.'
  })
  let m2s1Q1R3 = await RQuestion.create({
    correct: false,
    answerText: 'The book string, with the given word filtered out of it.',
    explanationText:
      'Incorrect, the function isn"t looking to modify the book string at all.'
  })
  let m2s1Q1E1 = await EQuestion.create({
    correct: false,
    answerText: '["sells", "seashells", "sea"]',
    explanationText:
      'Incorrect. We want the indicies of the words, not the words themself.'
  })
  let m2s1Q1E2 = await EQuestion.create({
    correct: true,
    answerText: '[4, 10, 27]',
    explanationText:
      'That"s right! Those are the indicies within the book where sells, seashells, and sea start at.'
  })
  let m2s1Q1E3 = await EQuestion.create({
    correct: false,
    answerText: '[(4,8), (10,19), (27,30)]',
    explanationText:
      'Incorrect. Those would be the range of the full word, we only want the index where the word starts at.'
  })
  let m2s1Q1A1 = await AQuestion.create({
    correct: true,
    answerText:
      'Iterate through the string, saving the index where we find the value at.',
    explanationText:
      'While this is correct, we"d have to parse through the book string, then parse our search string for each word within the book.',
    optimizationText:
      'The iterative solution ends up being O(n*m) complexity, which isn"t the best for this problem.'
  })
  let m2s1Q1A2 = await AQuestion.create({
    correct: true,
    answerText:
      'Create a hash table of the word, and look through it with the string.',
    explanationText:
      'This is correct and efficient. However, this is a lesson on trees, not hash tables!',
    optimizationText:
      'The has table will end up with an O(n) complexity, which is pretty efficient! Once again, however, this is a lesson on trees. Perhaps you could use those?'
  })
  let m2s1Q1A3 = await AQuestion.create({
    correct: true,
    answerText:
      'Create a tree which stores the prefixes of the word first, then look through that.',
    explanationText:
      'That"s right! While this may take a while upfront, the functions you"ll use later on for the tree will be much more efficient.',
    optimizationText:
      'This particular kind of tree tends to be called a trie, which tend to be used for search engine predictions.'
  })
  let m2s1Q1CT1 = await CTStuff.create({
    Input: '["Sea sells sea shells by the seashore", "se"]',
    Output: '[0, 4, 10, 28]'
  })
  let m2s1Q1CT2 = await CTStuff.create({
    Input:
      '["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "ShouldntExist"]',
    Output: '[]'
  })
  let m2s1Q1CT3 = await CTStuff.create({
    Input:
      '["Alice was beginning to get very tired of sitting by her sister on the bank and having nothing to do.", "si"]',
    Output: '[41, 56]'
  })

  let m2subTopic2 = await SubTopic.create({name: 'Graph traversal'})
  let m2s2Question1 = await Question.create({
    text:
      'Write a function that determines if a \
   path exists between two vertices of \
  a directed graph.'
  })
  let m2s2Q1QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What is the question asking for',
    EQuestion:
      "Example: What would the function return for func({ a: ['b'], b: ['c', 'd'], c: ['d'], d: []}, 'a', 'b')",
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'Consider drawing a graph, does it remind you of any other data structure \
    remember this is also a directed graph'
  })

  let m2s2Q1R1 = await RQuestion.create({
    correct: true,
    answerText:
      'return a boolean value that states whether or not one can traverse from the starting to vertex to the target',
    explanationText:
      'Correct! All the question requires is a true of false value based on if the traversal is possible or not.'
  })

  let m2s2Q1R2 = await RQuestion.create({
    correct: false,
    answerText: 'The exact path from the starting vertex to the target',
    explanationText:
      'Incorrect: The question is only asking if this path is possible'
  })

  let m2s2Q1R3 = await RQuestion.create({
    correct: false,
    answerText:
      'An array of all possible paths in the graph from the starting vertex',
    explanationText:
      'Incorrect: The question is only asking about the path from the starting vertext to the target'
  })

  let m2s2Q1E1 = await EQuestion.create({
    correct: false,
    answerText: 'false',
    explanationText: 'Incorrect: The path is plausible'
  })
  let m2s2Q1E2 = await EQuestion.create({
    correct: true,
    answerText: 'true',
    explanationText: 'Correct! This path is indeed traversable'
  })

  let m2s2Q1A1 = await AQuestion.create({
    correct: true,
    answerText:
      'Recursivley travel through the graph while keeping an array for already visited trees',
    explanationText:
      'This approach will allow you to easily traverse through the graph and make sure to not revisit the same nodes twice',
    optimizationText:
      ' Your solution is time-optimal at O(V+E) where V is the number of vertices or Nodes an E is the number of edges'
  })
  let m2s2Q1A2 = await AQuestion.create({
    correct: true,
    answerText:
      'Take a breath first like approach and iteratively travel through the graph and keep an array for all visited nodes',
    explanationText:
      'This approach will work as you know how many nodes are in the tree and your visited node array will keep you from revisiting nodes',
    optimizationText:
      'Your solution is time-optimal at O(V+E) where V is the number of vertices or Nodes an E is the number of edges'
  })
  let m2s2Q1CT1 = await CTStuff.create({
    Input:
      '[{"a": ["a", "c"], "c": ["r", "s"], "r": ["a"], "s": [] }, "a", "a"]',
    Output: 'true'
  })
  let m2s2Q1CT2 = await CTStuff.create({
    Input:
      '[{"a": ["a", "c"], "c": ["r", "s"], "r": ["a"], "s": [] }, "r", "s"]',
    Output: 'true'
  })
  let m2s2Q1CT3 = await CTStuff.create({
    Input:
      '[{"a": ["a", "c"], "c": ["r", "s"], "r": ["a"], "s": [] }, "s", "a"]',
    Output: 'false'
  })

  await mainTopic2.addSubTopic(m2subTopic1)
  await m2subTopic1.addQuestion(m2s1Question1)
  await m2s1Question1.setQuestionList(m2s1Q1QuestionList)
  await m2s1Q1QuestionList.addRQuestion([m2s1Q1R1, m2s1Q1R2, m2s1Q1R3]) //Assign REA questions to question list
  await m2s1Q1QuestionList.addEQuestion([m2s1Q1E1, m2s1Q1E2, m2s1Q1E3])
  await m2s1Q1QuestionList.addAQuestion([m2s1Q1A1, m2s1Q1A2, m2s1Q1A3])
  await m2s1Question1.addCTStuff([m2s1Q1CT1, m2s1Q1CT2, m2s1Q1CT3])

  await mainTopic2.addSubTopic(m2subTopic2)
  await m2subTopic2.addQuestion(m2s2Question1)
  await m2s2Question1.setQuestionList(m2s2Q1QuestionList)
  await m2s2Q1QuestionList.addRQuestion([m2s2Q1R1, m2s2Q1R2, m2s2Q1R3])
  await m2s2Q1QuestionList.addEQuestion([m2s2Q1E1, m2s2Q1E2])
  await m2s2Q1QuestionList.addAQuestion([m2s2Q1A1, m2s2Q1A2])
  await m2s2Question1.addCTStuff([m2s2Q1CT1, m2s2Q1CT2, m2s2Q1CT3])

  let mainTopic3 = await MainTopic.create({name: 'Bit Magic'})
  let m3subTopic1 = await SubTopic.create({name: 'Conversion'})
  let m3s1Question1 = await Question.create({
    text:
      'Write a functions that takes a number in base 10 (decimal) and converts it to the string representation of that number in base 2 (binary)'
  })
  let m3s1Q1QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What is the question asking for?',
    EQuestion: 'Example: What would the function return with input 13?',
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'Try not to use parseInt or toString.  Think about if you want to use arithmetic methods or bitwise operators.'
  })
  let m3s1Q1R1 = await RQuestion.create({
    correct: false,
    answerText: 'We want to convert a binary string to a number in base 10.',
    explanationText:
      'Not quite right.  Our input will be a number in base 10, and we want to return a binary string.'
  })
  let m3s1Q1R2 = await RQuestion.create({
    correct: true,
    answerText: 'We want to convert a decimal into a binary string.',
    explanationText:
      'Correct! A decimal is basically a number in base 10 in javascript.  We want to convert that into a binary string.'
  })
  let m3s1Q1R3 = await RQuestion.create({
    correct: false,
    answerText: 'We want to convert a number in base 10 to its string numeral',
    explanationText:
      'Incorrect, the string numeral is just its name ie 7, we want to convert to a binary string like 111.'
  })
  let m3s1Q1E1 = await EQuestion.create({
    correct: false,
    answerText: '1011',
    explanationText: 'Incorrect. This binary represents the number 11.'
  })
  let m3s1Q1E2 = await EQuestion.create({
    correct: false,
    answerText: '1111',
    explanationText: 'Incorrect.  This binary represents the number 15.'
  })
  let m3s1Q1E3 = await EQuestion.create({
    correct: true,
    answerText: '1101',
    explanationText: 'Correct! This binary represents the number 13!'
  })
  let m3s1Q1A1 = await AQuestion.create({
    correct: true,
    answerText:
      'Find the largest power of 2 that is smaller than or equal to n, where n is the original decimal.  Subtract that from n and repeat.',
    explanationText:
      'While this is correct, its an expensive way to find the solution.',
    optimizationText:
      'This solution ends up being O(log n) complexity, since you are effectively dividing by half every time.'
  })
  let m3s1Q1A2 = await AQuestion.create({
    correct: true,
    answerText:
      'Find the largest power of 2 that is smaller than or equal to n, where n is the original decimal.  Subtract that from n and repeat.  And increase the divisor by a power of 2 each time.',
    explanationText: 'This is the most optimal way using arithmetic methods.',
    optimizationText:
      'The has table will end up with slightly better than O(log n) complexity, which is pretty efficient.'
  })
  let m3s1Q1A3 = await AQuestion.create({
    correct: true,
    answerText: 'Use bitwise logic.',
    explanationText:
      'Correct!, while a bit trickier, this solution will ultimately be more performant.',
    optimizationText: 'This solution will just be O(n) complexity.'
  })
  let m3s1Q1CT1 = await CTStuff.create({
    Input: '[13]',
    Output: '"1101"'
  })
  let m3s1Q1CT2 = await CTStuff.create({
    Input: '[45]',
    Output: '"101101"'
  })
  let m3s1Q1CT3 = await CTStuff.create({
    Input: '[97]',
    Output: '"1100001"'
  })

  await mainTopic3.addSubTopic(m3subTopic1)
  await m3subTopic1.addQuestion(m3s1Question1)
  await m3s1Question1.setQuestionList(m3s1Q1QuestionList)
  await m3s1Q1QuestionList.addRQuestion([m3s1Q1R1, m3s1Q1R2, m3s1Q1R3]) //Assign REA questions to question list
  await m3s1Q1QuestionList.addEQuestion([m3s1Q1E1, m3s1Q1E2, m3s1Q1E3])
  await m3s1Q1QuestionList.addAQuestion([m3s1Q1A1, m3s1Q1A2, m3s1Q1A3])
  await m3s1Question1.addCTStuff([m3s1Q1CT1, m3s1Q1CT2, m3s1Q1CT3])

  let mainTopic4 = await MainTopic.create({name: 'Arrays'})
  let m4subTopic1 = await SubTopic.create({name: 'Subsequence'})
  let m4s1Question1 = await Question.create({
    text:
      'Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array.'
  })
  let m4s1Q1QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What is the question asking for?',
    EQuestion:
      'Example: What would the function return with input [3, 10, 4, 5]?',
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'Try to use dynamic programming: a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions.'
  })
  let m4s1Q1R1 = await RQuestion.create({
    correct: false,
    answerText: 'We want to get an array of the longest subsequence.',
    explanationText:
      'Not quite right.  We want to return the length of the longest subsequence.'
  })
  let m4s1Q1R2 = await RQuestion.create({
    correct: true,
    answerText: 'We want to return the length of the longest subsequence.',
    explanationText: 'Correct! We want to just return a number.'
  })
  let m4s1Q1R3 = await RQuestion.create({
    correct: false,
    answerText:
      'We want to return an array of arrays of all increasing subsequences.',
    explanationText:
      'Not quite right.  We want to return the length of the longest subsequence.'
  })
  let m4s1Q1E1 = await EQuestion.create({
    correct: false,
    answerText: '2',
    explanationText:
      'Incorrect. The longest subsequence is [3, 4, 5] so we want to return 3.'
  })
  let m4s1Q1E2 = await EQuestion.create({
    correct: false,
    answerText: '1',
    explanationText:
      'Incorrect. The longest subsequence is [3, 4, 5] so we want to return 3.'
  })
  let m4s1Q1E3 = await EQuestion.create({
    correct: true,
    answerText: '3',
    explanationText: 'Correct! This represents the length of [3, 4, 5]'
  })
  let m4s1Q1A1 = await AQuestion.create({
    correct: true,
    answerText: 'Use recursion to check all possible approaches.',
    explanationText:
      'While this is correct, its not the most optimal, since you are returning all combinations',
    optimizationText:
      'This solution ends up being O(2^n) time complexity with O(n) space complexity.'
  })
  let m4s1Q1A2 = await AQuestion.create({
    correct: true,
    answerText:
      'Create a new array that just stores the length of the longest increasing subsequence at the index.',
    explanationText:
      'Correct! This would be more efficent and use dynamic programming. The next time the same subproblem occurs, instead of recomputing its solution, one simply looks up the previously computed solution, thereby saving computation time at the expense of a (hopefully) modest expenditure in storage space. ',
    optimizationText: 'Time complexity is O(n^2) with an O(n) space complexity.'
  })
  let m4s1Q1A3 = await AQuestion.create({
    correct: true,
    answerText: 'Use a loglinear solution using binary search.',
    explanationText:
      'Correct!, while more complicated, this solution will ultimately be more performant.',
    optimizationText:
      'Big O: For each item in the sequence (length n) we do a binary search (log(n)), giving us a total runtime of n * log(n).'
  })
  let m4s1Q1CT1 = await CTStuff.create({
    Input: '[[3, 4, 2, 1, 10, 6]]',
    Output: '3'
  })
  let m4s1Q1CT2 = await CTStuff.create({
    Input: '[[10, 22, 9, 33, 20, 50, 41, 60, 80]]',
    Output: '6'
  })
  let m4s1Q1CT3 = await CTStuff.create({
    Input: '[[10, 22, 9, 33, 20, 50, 41, 60, 80, 21, 23, 24, 25, 26, 27, 28]]',
    Output: '9'
  })

  await mainTopic4.addSubTopic(m4subTopic1)
  await m4subTopic1.addQuestion(m4s1Question1)
  await m4s1Question1.setQuestionList(m4s1Q1QuestionList)
  await m4s1Q1QuestionList.addRQuestion([m4s1Q1R1, m4s1Q1R2, m4s1Q1R3]) //Assign REA questions to question list
  await m4s1Q1QuestionList.addEQuestion([m4s1Q1E1, m4s1Q1E2, m4s1Q1E3])
  await m4s1Q1QuestionList.addAQuestion([m4s1Q1A1, m4s1Q1A2, m4s1Q1A3])
  await m4s1Question1.addCTStuff([m4s1Q1CT1, m4s1Q1CT2, m4s1Q1CT3])

  let mainTopic5 = await MainTopic.create({name: 'Dynamic Programming'})
  let m5subTopic1 = await SubTopic.create({name: 'Subset Sum'})
  let m5s1Question1 = await Question.create({
    text:
      'Given a target sum and an array of positive integers, return true if any combination of numbers in the array can add to the target. Each number in the array may only be used once. Return false if the numbers cannot be used to add to the target sum.'
  })
  let m5s1Q1QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What is the question asking for?',
    EQuestion:
      'Example: What would the function return for this input? (2, [1,10,5,3])',
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'With dynamic programming techniques—i.e. recognizing overlapping subproblems and avoiding repeated work—we can optimize the funtcion'
  })
  let m5s1Q1R1 = await RQuestion.create({
    correct: true,
    answerText:
      'It is asking to return true ig the number can be used to add to the target sum',
    explanationText:
      'Correct! We just want to check whether or not an subset can be used to match the target.'
  })
  let m5s1Q1R2 = await RQuestion.create({
    correct: false,
    answerText: 'Return the numbers that can be used to add to the target sum',
    explanationText: 'Incorrect: The question only asks for true or false.'
  })
  let m5s1Q1R3 = await RQuestion.create({
    correct: false,
    answerText:
      'How many differents way the number inside the array can be used to match the target',
    explanationText: 'Incorrect: You only need to return true or false'
  })
  let m5s1Q1E1 = await EQuestion.create({
    correct: true,
    answerText: 'false',
    explanationText:
      'Correct! Tehre is no way to match the target value with the number in the array'
  })
  let m5s1Q1E2 = await EQuestion.create({
    correct: false,
    answerText: 'true',
    explanationText:
      'Incorrect. It is not possible to use the number inside the array to add to the target sum'
  })
  let m5s1Q1E3 = await EQuestion.create({
    correct: false,
    answerText: '[]',
    explanationText: 'Not quite right. The expected return value is a Boolean'
  })
  let m5s1Q1A1 = await AQuestion.create({
    correct: true,
    answerText:
      'Accumulate a set or an array of possible sums starting from 0. We could loop through each given number and add it to every number already in the set. We can then include each of these new possibilities into the possible sums set',
    explanationText:
      'That would work, however you will have to check for a large number of possible combinations on each interation.',
    optimizationText:
      'You used a set or an array to solve. You should take a look at Memoization to find a better solution'
  })
  let m5s1Q1A2 = await AQuestion.create({
    correct: true,
    answerText:
      'Stepping through each number in the array and determining whether 1) including it in the sum will lead to a true result (using the remaining numbers) or 2) excluding it from the sum will lead to a true result (using the remaining numbers).',
    explanationText:
      'Great! This way you will be taking advantage of memoization.',
    optimizationText:
      'You choose to use memoization. That is the best approch for this problem'
  })
  let m5s1Q1CT1 = await CTStuff.create({
    Input: '[2, [1,10,5,3]]',
    Output: 'false'
  })
  let m5s1Q1CT2 = await CTStuff.create({
    Input: '[10, [1,10,5,3]]',
    Output: 'true'
  })
  let m5s1Q1CT3 = await CTStuff.create({
    Input: '[9, [1,10,5,3]]',
    Output: 'true'
  })
  let m5s1Q1CT4 = await CTStuff.create({
    Input: '[17, [1,10,5,3]]',
    Output: 'false'
  })

  await mainTopic5.addSubTopic(m5subTopic1) //Assign subtopic to main topic
  await m5subTopic1.addQuestion(m5s1Question1) //Assign question to subtopic
  await m5s1Question1.setQuestionList(m5s1Q1QuestionList) //Assign question list to question
  await m5s1Q1QuestionList.addRQuestion([m5s1Q1R1, m5s1Q1R2, m5s1Q1R3]) //Assign REA questions to question list
  await m5s1Q1QuestionList.addEQuestion([m5s1Q1E1, m5s1Q1E2, m5s1Q1E3])
  await m5s1Q1QuestionList.addAQuestion([m5s1Q1A1, m5s1Q1A2])
  await m5s1Question1.addCTStuff([m5s1Q1CT1, m5s1Q1CT2, m5s1Q1CT3, m5s1Q1CT4]) //Assign CTStuff to Question

  let mainTopic6 = await MainTopic.create({name: 'Search Optimization'})
  let m6subTopic1 = await SubTopic.create({name: 'Dictionaries'})
  let m6s1Question1 = await Question.create({
    text:
      'Given an alphabetical array of dictionary entries and a word to search for, find that \
       words definition (if it exists)'
  })
  let m6s1Q1QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What is the question asking for?',
    EQuestion:
      'Example: What would the function return for this input? \
      const dictionary = [ \
        "a - Used when mentioning someone or something for the first time in a text or conversation", \
        "and - Used to connect words of the same part of speech, clauses, or sentences, that are to be taken jointly," \
        "be - Exist" \
        definitionOf("be", dictionary);',
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'With the dictionary being sorted, how can we more efficiently find our answer'
  })
  let m6s1Q1R1 = await RQuestion.create({
    correct: false,
    answerText:
      'It is asking us to return all the definitions in the dictionary',
    explanationText:
      'Incorrect: We just want to know the defintion for the given word'
  })
  let m6s1Q1R2 = await RQuestion.create({
    correct: false,
    answerText:
      'It is asking us for the definitions of every word besides the given one',
    explanationText:
      'Incorrect: We just want to know the defintion for the given word'
  })
  let m6s1Q1R3 = await RQuestion.create({
    correct: true,
    answerText: 'It is asking us for the definitions of the given word',
    explanationText: 'Correct! We only want the defintion for the given word'
  })
  let m6s1Q1E1 = await EQuestion.create({
    correct: false,
    answerText: 'Expressing the relationship between a part and a whole',
    explanationText: 'Incorrect! Thats not even in the given dictionary'
  })
  let m6s1Q1E2 = await EQuestion.create({
    correct: false,
    answerText: 'be - exist',
    explanationText: 'Incorrect. We only want the definition'
  })
  let m6s1Q1E3 = await EQuestion.create({
    correct: true,
    answerText: 'exist',
    explanationText: 'Correct!'
  })
  let m6s1Q1A1 = await AQuestion.create({
    correct: true,
    answerText: 'Iterate through the array until you find the correct word',
    explanationText:
      'That would work, however you will have to check every possible word',
    optimizationText:
      'You choose the brute force solution which is very feasible but does not take advantage of \
      the fact that the dictionary is sorted resulting in a runtime of O(n)'
  })
  let m6s1Q1A2 = await AQuestion.create({
    correct: true,
    answerText:
      'Use pointers and midpoints to implement a binary search to eliminate half the values every time you do not find the given word',
    explanationText:
      'Great! This is the most efficient way and will take advatange of the fact that this is a sorted object.',
    optimizationText:
      'Implementing a binary search results in an O(logn) time complexity'
  })
  let m6s1Q1CT1 = await CTStuff.create({
    Input:
      '["be", [ \
      "a - Used when mentioning someone or something for the first time in a text or conversation" , \
      "and - Used to connect words of the same part of speech, clauses, or sentences, that are to be taken jointly", \
      "be - Exist", \
      "in - Expressing the situation of something that is or appears to be enclosed or surrounded by something else", \
      "of - Expressing the relationship between a part and a whole", \
      "that - Used to identify a specific person or thing observed or heard by the speaker", \
      "the - Denoting one or more people or things already mentioned or assumed to be common knowledge", \
      "to - Expressing motion in the direction of (a particular location)" \
    ]]',
    Output: '"Exist"'
  })
  let m6s1Q1CT2 = await CTStuff.create({
    Input:
      '["that", [ \
      "a - Used when mentioning someone or something for the first time in a text or conversation" , \
      "and - Used to connect words of the same part of speech, clauses, or sentences, that are to be taken jointly", \
      "be - Exist", \
      "in - Expressing the situation of something that is or appears to be enclosed or surrounded by something else", \
      "of - Expressing the relationship between a part and a whole", \
      "that - Used to identify a specific person or thing observed or heard by the speaker", \
      "the - Denoting one or more people or things already mentioned or assumed to be common knowledge", \
      "to - Expressing motion in the direction of (a particular location)" \
    ]]',
    Output:
      '"Used to identify a specific person or thing observed or heard by the speaker"'
  })
  let m6s1Q1CT3 = await CTStuff.create({
    Input:
      '["MCGOGELFARTBERG", [ \
      "a - Used when mentioning someone or something for the first time in a text or conversation" , \
      "and - Used to connect words of the same part of speech, clauses, or sentences, that are to be taken jointly", \
      "be - Exist", \
      "in - Expressing the situation of something that is or appears to be enclosed or surrounded by something else", \
      "of - Expressing the relationship between a part and a whole", \
      "that - Used to identify a specific person or thing observed or heard by the speaker", \
      "the - Denoting one or more people or things already mentioned or assumed to be common knowledge", \
      "to - Expressing motion in the direction of (a particular location)" \
    ]]',
    Output: 'undefined'
  })

  await mainTopic6.addSubTopic(m6subTopic1) //Assign subtopic to main topic
  await m6subTopic1.addQuestion(m6s1Question1) //Assign question to subtopic
  await m6s1Question1.setQuestionList(m6s1Q1QuestionList) //Assign question list to question
  await m6s1Q1QuestionList.addRQuestion([m6s1Q1R1, m6s1Q1R2, m6s1Q1R3]) //Assign REA questions to question list
  await m6s1Q1QuestionList.addEQuestion([m6s1Q1E1, m6s1Q1E2, m6s1Q1E3])
  await m6s1Q1QuestionList.addAQuestion([m6s1Q1A1, m6s1Q1A2])
  await m6s1Question1.addCTStuff([m6s1Q1CT1, m6s1Q1CT2, m6s1Q1CT3]) //Assign CTStuff to Question
  let m3s1Question2 = await Question.create({
    text:
      'Write a functions that takes a string represation of a number in base 2 (binary) and converts it to that number in base 10 (decimal)'
  })
  let m3s1Q2QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What is the question asking for?',
    EQuestion: 'Example: What would the function return with input "100"?',
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'Iterate through all the digits multiplying them by increasing powers of 2'
  })
  let m3s1Q2R1 = await RQuestion.create({
    correct: true,
    answerText: 'We want to convert a binary string to a number in base 10.',
    explanationText:
      'Correct! Our input will be a number in base 10, and we want to return a binary string.'
  })
  let m3s1Q2R2 = await RQuestion.create({
    correct: false,
    answerText: 'We want to convert a decimal into a binary string.',
    explanationText:
      'Incorret! A decimal is basically a number in base 10 in javascript. We want to convert that into a binary string.'
  })
  let m3s1Q2R3 = await RQuestion.create({
    correct: false,
    answerText: 'We want to convert a binary string to its string numeral',
    explanationText:
      'Not quite right, we want the number as result, and not its string representation'
  })
  let m3s1Q2E1 = await EQuestion.create({
    correct: false,
    answerText: '100',
    explanationText:
      'Incorrect. We want to convert from binary to decimal. 100 would be the answer if we had "1100100" as input'
  })
  let m3s1Q2E2 = await EQuestion.create({
    correct: false,
    answerText: '64',
    explanationText: 'Incorrect. This is the hexadecimal representation of 100'
  })
  let m3s1Q2E3 = await EQuestion.create({
    correct: true,
    answerText: '4',
    explanationText: 'Correct! This binary represents the number 4!'
  })
  let m3s1Q2A1 = await AQuestion.create({
    correct: true,
    answerText:
      'Iterate through all the digits multiplying them by increasing powers of 2. You will have to track the digit position you are checking to match the power you are doing and a variable with the total',
    explanationText: 'It is a good approach and should work fine',
    optimizationText:
      'This solution leads to a O(n) time complexity and it is good for this problem'
  })
  let m3s1Q2A2 = await AQuestion.create({
    correct: true,
    answerText:
      'Split the string input in to an array and reverse it. Then loop over it, using Math.pow(2) in every single number, multiplying it by the number itself (0 or 1) and holding the current value in a variable',
    explanationText: 'It is a good approach and should work fine',
    optimizationText:
      'This solution leads to a O(n) time complexity and it is good for this problem'
  })

  let m3s1Q2CT1 = await CTStuff.create({
    Input: '["100"]',
    Output: '4'
  })
  let m3s1Q2CT2 = await CTStuff.create({
    Input: '["1010"]',
    Output: '10'
  })
  let m3s1Q2CT3 = await CTStuff.create({
    Input: '["10011011"]',
    Output: '155'
  })

  await m3subTopic1.addQuestion(m3s1Question2)
  await m3s1Question2.setQuestionList(m3s1Q2QuestionList)
  await m3s1Q2QuestionList.addRQuestion([m3s1Q2R1, m3s1Q2R2, m3s1Q2R3]) //Assign REA questions to question list
  await m3s1Q2QuestionList.addEQuestion([m3s1Q2E1, m3s1Q2E2, m3s1Q2E3])
  await m3s1Q2QuestionList.addAQuestion([m3s1Q2A1, m3s1Q2A2])
  await m3s1Question2.addCTStuff([m3s1Q2CT1, m3s1Q2CT2, m3s1Q2CT3])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We"ve separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
