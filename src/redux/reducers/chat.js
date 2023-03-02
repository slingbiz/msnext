import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, GET_CHAT_OF_USER } from '../../constants/actionTypes'

const INIT_STATE = {
  loading: undefined,
  allChatOfUser: []
}

const chat = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, loading: true }
    }

    case FETCH_SUCCESS: {
      return {
        ...state,
        error: '',
        loading: false
      }
    }

    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case GET_CHAT_OF_USER: {
      return {
        ...state,
        loading: false,
        allChatOfUser: action.payload
      }
    }

    default:
      return state
  }
}

export default chat
