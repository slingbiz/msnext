import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  UPDATE_MYCAR_LISTINGS,
  UPDATE_MYLEAD_LISTINGS,
  UPDATE_USER,
  GET_SINGLE_USER,
  UPDATE_STATUS,
  UPDATE_MYRFQ_LISTINGS,
  GET_BRANDS,
  GET_MODELS,
  GET_CITIES
} from '../../constants/actionTypes'

const INIT_STATE = {
  myCarListings: [],
  myLeadListings: [],
  loading: undefined,
  singleUser: [],
  brands: [],
  models: [],
  cities: []
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

    case UPDATE_MYRFQ_LISTINGS: {
      return {
        ...state,
        loading: false,
        myLeadListings: action.payload
      }
    }

    case UPDATE_STATUS: {
      return {
        ...state,
        loading: false
      }
    }

    case UPDATE_USER: {
      return {
        ...state,
        loading: false
      }
    }

    case GET_SINGLE_USER: {
      return {
        ...state,
        loading: false,
        singleUser: action.payload
      }
    }

    case GET_BRANDS: {
      return {
        ...state,
        loading: false,
        brands: action.payload
      }
    }

    case GET_MODELS: {
      return {
        ...state,
        loading: false,
        models: action.payload
      }
    }

    case GET_CITIES: {
      return {
        ...state,
        loading: false,
        cities: action.payload
      }
    }

    default:
      return state
  }
}

export default myAccount
