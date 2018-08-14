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
console.log(`seeded ${users.length} users`)
console.log(`seeded successfully`)

