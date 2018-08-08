'use strict'

const db = require('../server/db')
const {User, MainTopic, SubTopic, Question, QuestionList, RQuestion, EQuestion, AQuestion, CTStuff} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    MainTopic.create({name: "Implementing Functions"}),
  SubTopic.create({name: "Intercept", MainTopicId: 1}),
  Question.create({text: "Given two sorted arrays of numbers, return an array containing all values that appear in both arrays. The numbers in the resulting array (the 'intersection') may be returned in any order, they needn't be sorted.", SubTopicId: 1}),
  QuestionList.create({
    RQuestion: "Repeat: What is the question asking for?",
    EQuestion: "Example: What would the function return for these two arrays? [0,1,2,3,4,5,6] , [2,4,6,8]",
    AQuestion: "Approach: What would be the best approach for this problem?",
    AQuestionConsideration: "Consider the following: The two arrays are sorted, can this assist in our solution? Can parsing one element allow us to avoid parsing others?",
    QuestionId: 1,
  }),
  RQuestion.create({
    correct: true,
    answerText: "An array of all elements that are present in both arrays.",
    explanationText: "Correct! We want to find the intersection of the two arrays: elements that both arrays share.",
    QuestionId: 1
  }),
  RQuestion.create({
    correct: false,
    answerText: "Return a new sorted array with all the elements from both arrays.",
    explanationText: "Incorrect: The question only asks for the “intersection”.",
    QuestionId: 1
  }),
  RQuestion.create({
    correct: false,
    answerText: "An sorted array with duplicates from both arrays.",
    explanationText: "Incorrect: the answer array does not need to be sorted.",
    QuestionId: 1
  }),
  EQuestion.create({
    correct: true,
    answerText: "[2,4,6]",
    explanationText: "Correct! As 2, 4, and 6 are present in both arrays, we want to return the array with those values.",
    QuestionId: 1
  }),
  EQuestion.create({
    correct: false,
    answerText: "[12]",
    explanationText: "Incorrect. This would be the sum of all intersecting elements.",
    QuestionId: 1
  }),
  EQuestion.create({
    correct: false,
    answerText: "[0,1,3,5,8]",
    explanationText: "Not quite right. This is the opposite of what we’re intending to search for, and would be the array of all elements that aren’t present in both arrays.",
    QuestionId: 1
  }),
  AQuestion.create({
    correct: true,
    answerText: "Assign one array to a hash table, and parse the other array through it, returning values that match.",
    explanationText: "While this is an efficient time solution, you would need to store the hash table of the array, increasing size complexity.",
    optimizationText: "You used a hash table to solve this problem. Your solution is time-optimal at O(n+m), but requires an additional O(m) of space.",
    QuestionId: 1
  }),
  AQuestion.create({
    correct: true,
    answerText: "Do a for loop for each element, comparing an element in array 1 with each element in array.",
    explanationText: "This would work, however, it would be rather inefficient, as you would need to parse all elements in array 1 for each element in array 2.",
    optimizationText: "You choose to use nested for loops, therefore the run time of your program would be O(n*m) because for every element in N you would need to loop through all of M.",
    QuestionId: 1
  }),
  AQuestion.create({
    correct: true,
    answerText: "Point to two different index values of the array, and only the index where the selected element is lesser. Increment both and save the value if they match.",
    explanationText: "Correct! This is the most efficient solution for both time and space for this problem.",
    optimizationText: "You used pointers to iterate through the loop, great! This solution would be O(n+m).",
    QuestionId: 1
  }),
  CTStuff.create({
    QuestionId: 1,
    Code: "Here is where we'd put in the code for parsing what the user codes in.",
  })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
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
