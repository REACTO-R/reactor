//ACTION TYPES
const GET_ROOM_NAME = 'GET_ROOM_NAME'
const GET_ROOM = 'GET_ROOM'
const LEAVE_ROOM = 'LEAVE_ROOM'

//INITIAL STATE
const initialState = {
  roomName: '',
  room: {}
}

//ACTION CREATORS
export const getRoomName = room => {
  return {
    type: GET_ROOM_NAME,
    room
  }
}

export const getRoom = room => {
  return {
    type: GET_ROOM,
    room
  }
}

export const leaveRoom = () => {
  return {
    type: LEAVE_ROOM
  }
}

//THUNK CREATOR
// export const getRoom = (room) => async dispatch => {
//   try {
//     dispatch(getRoomName(room)
//   } catch (err) {
//     console.error(err)
//   }
// }

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_NAME:
      return {...state, roomName: action.room}
    case GET_ROOM:
      return {...state, room: action.room}
    case LEAVE_ROOM:
      return initialState
    default:
      return state
  }
}
