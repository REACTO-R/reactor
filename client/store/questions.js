import axios from 'axios'
import history from '../history'


//ACTION TYPES

const GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS";

//INITIAL STATE
const initialState = {};

//ACTION CREATORS
const getAllQuestions = questions => {
    return {
        type: GET_ALL_QUESTIONS,
        questions
    }
}

//THUNK CREATOR 
export const fetchQuestions = () => async dispatch => {
    try {
        const res = await axios.get('/api/questions');
        dispatch(getAllQuestions(res.data));
    } catch (err){
        console.error(err)
    }
}


//REDUCER
export default function(state = initialState, action){
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            return action.questions
        default:
            return state;
    }
}