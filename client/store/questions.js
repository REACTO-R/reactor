import axios from 'axios'
import history from '../history'

//ACTION TYPES

const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS'
const GET_QUESTION = 'GET_QUESTION'

//INITIAL STATE
const initialState = {}

//ACTION CREATORS
const getAllQuestions = questions => {
  return {
    type: GET_ALL_QUESTIONS,
    questions
  }
}

const getQuestion = question => {
  return {
    type: GET_QUESTION,
    question
  }
}

//THUNK CREATOR
export const fetchQuestions = () => async dispatch => {
  try {
    const res = await axios.get('/api/questions')
    dispatch(getAllQuestions(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchQuestion = (
  topicId,
  subtopicId,
  questionId
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/questions/${topicId}/${subtopicId}/${questionId}`
    )
    dispatch(getQuestion(res.data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return action.questions
    case GET_QUESTION:
      return action.question
    default:
      return state
  }
}
