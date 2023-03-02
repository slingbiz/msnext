import {
  getMyCarListings,
  getMyLeadListings,
  updateUser,
  getSingleUser,
  updateStatus,
  getMyRFQListings,
  getBrands,
  getModels
} from '../../services/myAccount'
import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  UPDATE_MYCAR_LISTINGS,
  UPDATE_MYRFQ_LISTINGS,
  UPDATE_USER,
  GET_SINGLE_USER,
  UPDATE_STATUS,
  GET_BRANDS,
  GET_MODELS
} from '../../constants/actionTypes'

import { SOMETHING_WENT_WRONG } from '../../constants/common'

export const getSingleUserAction = params => {
  return async dispatch => {
    dispatch({ type: FETCH_START })

    try {
      const singleUser = await getSingleUser(params)
      console.log(singleUser, ' --- singleUser response')
      if (singleUser.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: GET_SINGLE_USER,
          payload: singleUser.data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data?.message || SOMETHING_WENT_WRONG
        })
      }
    } catch (e) {
      console.log(e.message, ' --- singleUser error')
      dispatch({
        type: FETCH_ERROR,
        payload: []
      })
    }
  }
}

export const updateStatusAction = params => {
  return async dispatch => {
    dispatch({ type: FETCH_START })

    try {
      const updatedStatus = await updateStatus(params)
      console.log(updatedStatus, ' --- updatedStatus response')
      if (updatedStatus.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: UPDATE_STATUS,
          payload: updatedStatus.data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data?.message || SOMETHING_WENT_WRONG
        })
      }
    } catch (e) {
      console.log(e.message, ' --- updatedStatus error')
      dispatch({
        type: FETCH_ERROR,
        payload: []
      })
    }
  }
}

export const updateUserAction = params => {
  return async dispatch => {
    dispatch({ type: FETCH_START })

    try {
      const updatedUser = await updateUser(params)
      console.log(updatedUser, ' --- updatedUser response')
      if (updatedUser.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: UPDATE_USER,
          payload: updatedUser.data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data?.message || SOMETHING_WENT_WRONG
        })
      }
    } catch (e) {
      console.log(e.message, ' --- updatedUser error')
      dispatch({
        type: FETCH_ERROR,
        payload: []
      })
    }
  }
}

export const getMyCarListingsAction = params => {
  return async dispatch => {
    dispatch({ type: FETCH_START })

    try {
      const usedCarListingsRes = await getMyCarListings(params)
      console.log(usedCarListingsRes, ' -- -usedCarListings response')
      if (usedCarListingsRes.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: UPDATE_MYCAR_LISTINGS,
          payload: usedCarListingsRes.data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data?.message || SOMETHING_WENT_WRONG
        })
      }
    } catch (e) {
      console.log(e.message, ' -- -usedCarListings error')

      dispatch({
        type: FETCH_ERROR,
        payload: []
      })
    }
  }
}

export const getMyLeadListingsAction = params => {
  return async dispatch => {
    dispatch({ type: FETCH_START })

    try {
      const myLeadListings = await getMyLeadListings(params)
      console.log(myLeadListings, ' -- -myLeadListings response')
      if (myLeadListings.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: UPDATE_MYRFQ_LISTINGS,
          payload: myLeadListings.data.data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data?.message || SOMETHING_WENT_WRONG
        })
      }
    } catch (e) {
      console.log(e.message, ' -- -myLeadListings error')
      dispatch({
        type: FETCH_ERROR,
        payload: []
      })
    }
  }
}

export const getMyRFQListingsAction = params => {
  return async dispatch => {
    dispatch({ type: FETCH_START })

    try {
      const myRFQListings = await getMyRFQListings(params)
      console.log(myRFQListings, ' -- -myRFQListings response')
      if (myRFQListings.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: UPDATE_MYRFQ_LISTINGS,
          payload: myRFQListings.data.data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data?.message || SOMETHING_WENT_WRONG
        })
      }
    } catch (e) {
      console.log(e.message, ' -- -myRFQListings error')
      dispatch({
        type: FETCH_ERROR,
        payload: []
      })
    }
  }
}

export const getBrandsAction = params => {
  return async dispatch => {
    dispatch({ type: FETCH_START })

    try {
      const brands = await getBrands(params)
      console.log(brands, ' --- brands response')
      if (brands.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: GET_BRANDS,
          payload: brands.data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data?.message || SOMETHING_WENT_WRONG
        })
      }
    } catch (e) {
      console.log(e.message, ' --- brands error')
      dispatch({
        type: FETCH_ERROR,
        payload: []
      })
    }
  }
}

export const getModelsAction = params => {
  return async dispatch => {
    dispatch({ type: FETCH_START })

    try {
      const models = await getModels(params)
      console.log(models, ' --- models response')
      if (models.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: GET_MODELS,
          payload: models.data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data?.message || SOMETHING_WENT_WRONG
        })
      }
    } catch (e) {
      console.log(e.message, ' --- models error')
      dispatch({
        type: FETCH_ERROR,
        payload: []
      })
    }
  }
}
