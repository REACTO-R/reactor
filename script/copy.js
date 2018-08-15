
  let mainTopic4 = await MainTopic.create({name: 'Dynamic Programming'})
  let m3subTopic1 = await SubTopic.create({name: 'Subsequence'})
  let m3s1Question1 = await Question.create({
    text:
      'Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array.'
  })
  let m3s1Q1QuestionList = await QuestionList.create({
    RQuestion: 'Repeat: What is the question asking for?',
    EQuestion: 'Example: What would the function return with input [3, 10, 4, 5]?',
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'Try to use dynamic programming: a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions.'
  })
  let m3s1Q1R1 = await RQuestion.create({
    correct: false,
    answerText: 'We want to get an array of the longest subsequence.',
    explanationText:
      'Not quite right.  We want to return the length of the longest subsequence.'
  })
  let m3s1Q1R2 = await RQuestion.create({
    correct: true,
    answerText: 'We want to return the length of the longest subsequence.',
    explanationText:
      'Correct! We want to just return a number.'
  })
  let m3s1Q1R3 = await RQuestion.create({
    correct: false,
    answerText: 'We want to return an array of arrays of all increasing subsequences.',
    explanationText:
      'Not quite right.  We want to return the length of the longest subsequence.'
  })
  let m3s1Q1E1 = await EQuestion.create({
    correct: false,
    answerText: '2',
    explanationText: 'Incorrect. The longest subsequence is [3, 4, 5] so we want to return 3.'
  })
  let m3s1Q1E2 = await EQuestion.create({
    correct: false,
    answerText: '1',
    explanationText:  'Incorrect. The longest subsequence is [3, 4, 5] so we want to return 3.'
  })
  let m3s1Q1E3 = await EQuestion.create({
    correct: true,
    answerText: '3',
    explanationText: 'Correct! This represents the length of [3, 4, 5]'
  })
  let m3s1Q1A1 = await AQuestion.create({
    correct: true,
    answerText:
      'Use recursion to check all possible approaches.',
    explanationText:
      'While this is correct, its not the most optimal, since you are returning all combinations',
    optimizationText:
      'This solution ends up being O(2^n) time complexity with O(n) space complexity.'
  })
  let m3s1Q1A2 = await AQuestion.create({
    correct: true,
    answerText:
      'Create a new array that just stores the length of the longest increasing subsequence at the index.',
    explanationText: 'Correct! This would be more efficent and use dynamic programming. The next time the same subproblem occurs, instead of recomputing its solution, one simply looks up the previously computed solution, thereby saving computation time at the expense of a (hopefully) modest expenditure in storage space. ',
    optimizationText:
      'Time complexity is O(n^2) with an O(n) space complexity.'
  })
  let m3s1Q1A3 = await AQuestion.create({
    correct: true,
    answerText: 'Use a loglinear solution using binary search.',
    explanationText:
      'Correct!, while more complicated, this solution will ultimately be more performant.',
    optimizationText: 'Big O: For each item in the sequence (length n) we do a binary search (log(n)), giving us a total runtime of n * log(n).'
  })
  let m3s1Q1CT1 = await CTStuff.create({
    Input: '[3, 4, 2, 1, 10, 6]',
    Output: '3'
  })
  let m3s1Q1CT2 = await CTStuff.create({
    Input: '[10, 22, 9, 33, 20, 50, 41, 60, 80]',
    Output: '6'
  })
  let m3s1Q1CT3 = await CTStuff.create({
    Input: '[10, 22, 9, 33, 20, 50, 41, 60, 80, 21, 23, 24, 25, 26, 27, 28]',
    Output: '9'
  })

  await mainTopic3.addSubTopic(m3subTopic1)
  await m3subTopic1.addQuestion(m3s1Question1)
  await m3s1Question1.setQuestionList(m3s1Q1QuestionList)
  await m3s1Q1QuestionList.addRQuestion([m3s1Q1R1, m3s1Q1R2, m3s1Q1R3]) //Assign REA questions to question list
  await m3s1Q1QuestionList.addEQuestion([m3s1Q1E1, m3s1Q1E2, m3s1Q1E3])
  await m3s1Q1QuestionList.addAQuestion([m3s1Q1A1, m3s1Q1A2, m3s1Q1A3])
  await m3s1Question1.addCTStuff([m3s1Q1CT1, m3s1Q1CT2, m3s1Q1CT3])
