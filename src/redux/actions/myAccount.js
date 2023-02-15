import { getMyCarListings, getMyLeadListings, updateUser, getSingleUser } from '../../services/myAccount'
import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  UPDATE_MYCAR_LISTINGS,
  UPDATE_MYLEAD_LISTINGS,
  UPDATE_USER,
  GET_SINGLE_USER
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
      const myLeadListings = await getMyLeadListings({ filter_type: params.filterValue })
      console.log(myLeadListings, ' -- -myLeadListings response')
      if (myLeadListings.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: UPDATE_MYLEAD_LISTINGS,
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
