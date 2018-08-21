export const question = {
  id: 1,
  text:
    'Given two sorted arrays of numbers, return an array containing all values that appear in both arrays. The numbers in the resulting array (the "intersection") may be returned in any order, they needn"t be sorted.',
  createdAt: '2018-08-17T16:05:25.260Z',
  updatedAt: '2018-08-17T16:05:25.361Z',
  SubTopicId: 1,
  QuestionList: {
    id: 1,
    RQuestion: 'Repeat: What is the question asking for?',
    EQuestion:
      'Example: What would the function return for these two arrays? [0,1,2,3,4,5,6] , [2,4,6,8]',
    AQuestion: 'Approach: What would be the best approach for this problem?',
    AQuestionConsideration:
      'Consider the following: The two arrays are sorted, can this assist in our solution? Can parsing one element allow us to avoid parsing others?',
    createdAt: '2018-08-17T16:05:25.264Z',
    updatedAt: '2018-08-17T16:05:25.368Z',
    QuestionId: 1,
    RQuestions: [
      {
        id: 3,
        correct: false,
        answerText: 'An sorted array with duplicates from both arrays.',
        explanationText:
          'Incorrect: the answer array does not need to be sorted.',
        createdAt: '2018-08-17T16:05:25.274Z',
        updatedAt: '2018-08-17T16:05:25.371Z',
        QuestionListId: 1
      },
      {
        id: 2,
        correct: false,
        answerText:
          'Return a new sorted array with all the elements from both arrays.',
        explanationText:
          'Incorrect: The question only asks for the “intersection”.',
        createdAt: '2018-08-17T16:05:25.271Z',
        updatedAt: '2018-08-17T16:05:25.371Z',
        QuestionListId: 1
      },
      {
        id: 1,
        correct: true,
        answerText: 'An array of all elements that are present in both arrays.',
        explanationText:
          'Correct! We want to find the intersection of the two arrays: elements that both arrays share.',
        createdAt: '2018-08-17T16:05:25.268Z',
        updatedAt: '2018-08-17T16:05:25.371Z',
        QuestionListId: 1
      }
    ],
    EQuestions: [
      {
        id: 3,
        correct: false,
        answerText: '[0,1,3,5,8]',
        explanationText:
          'Not quite right. This is the opposite of what we’re intending to search for, and would be the array of all elements that aren’t present in both arrays.',
        createdAt: '2018-08-17T16:05:25.297Z',
        updatedAt: '2018-08-17T16:05:25.374Z',
        QuestionListId: 1
      },
      {
        id: 2,
        correct: false,
        answerText: '[12]',
        explanationText:
          'Incorrect. This would be the sum of all intersecting elements.',
        createdAt: '2018-08-17T16:05:25.294Z',
        updatedAt: '2018-08-17T16:05:25.374Z',
        QuestionListId: 1
      },
      {
        id: 1,
        correct: true,
        answerText: '[2,4,6]',
        explanationText:
          'Correct! As 2, 4, and 6 are present in both arrays, we want to return the array with those values.',
        createdAt: '2018-08-17T16:05:25.278Z',
        updatedAt: '2018-08-17T16:05:25.374Z',
        QuestionListId: 1
      }
    ],
    AQuestions: [
      {
        id: 1,
        correct: true,
        answerText:
          'Assign one array to a hash table, and parse the other array through it, returning values that match.',
        explanationText:
          'While this is an efficient time solution, you would need to store the hash table of the array, increasing size complexity.',
        optimizationText:
          'You used a hash table to solve this problem. Your solution is time-optimal at O(n+m), but requires an additional O(m) of space.',
        createdAt: '2018-08-17T16:05:25.300Z',
        updatedAt: '2018-08-17T16:05:25.377Z',
        QuestionListId: 1
      },
      {
        id: 2,
        correct: true,
        answerText:
          'Do a for loop for each element, comparing an element in array 1 with each element in array.',
        explanationText:
          'This would work, however, it would be rather inefficient, as you would need to parse all elements in array 1 for each element in array 2.',
        optimizationText:
          'You choose to use nested for loops, therefore the run time of your program would be O(n*m) because for every element in N you would need to loop through all of M.',
        createdAt: '2018-08-17T16:05:25.303Z',
        updatedAt: '2018-08-17T16:05:25.377Z',
        QuestionListId: 1
      },
      {
        id: 3,
        correct: true,
        answerText:
          'Point to two different index values of the array, and only the index where the selected element is lesser. Increment both and save the value if they match.',
        explanationText:
          'Correct! This is the most efficient solution for both time and space for this problem.',
        optimizationText:
          'You used pointers to iterate through the loop, great! This solution would be O(n+m).',
        createdAt: '2018-08-17T16:05:25.306Z',
        updatedAt: '2018-08-17T16:05:25.377Z',
        QuestionListId: 1
      }
    ]
  },
  CTStuffs: [
    {
      id: 3,
      Input: '[[4, 8, 15, 16, 23, 42], [2, 4, 8, 16, 32, 64]]',
      Output: '[4,8,16]',
      createdAt: '2018-08-17T16:05:25.315Z',
      updatedAt: '2018-08-17T16:05:25.379Z',
      QuestionId: 1
    },
    {
      id: 2,
      Input: '[[0,1,2,3], [4,5,6,7,8]]',
      Output: '[]',
      createdAt: '2018-08-17T16:05:25.312Z',
      updatedAt: '2018-08-17T16:05:25.379Z',
      QuestionId: 1
    },
    {
      id: 1,
      Input: '[[0,1,2,3,4,5,6], [2,4,6,8]]',
      Output: '[2,4,6]',
      createdAt: '2018-08-17T16:05:25.309Z',
      updatedAt: '2018-08-17T16:05:25.379Z',
      QuestionId: 1
    }
  ]
}
