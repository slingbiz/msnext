import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  UPDATE_MYCAR_LISTINGS,
  UPDATE_MYLEAD_LISTINGS
} from '../../constants/actionTypes'

const INIT_STATE = {
  myCarListings: [],
  myLeadListings: [],
  loading: undefined
}

const myAccount = (state = INIT_STATE, action) => {
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

    case UPDATE_MYCAR_LISTINGS: {
      return {
        ...state,
        loading: false,
        myCarListings: action.payload
      }
    }
    case UPDATE_MYLEAD_LISTINGS: {
      return {
        ...state,
        loading: false,
        myLeadListings: action.payload
      }
    }

    default:
      return state
  }
}

export default myAccount
