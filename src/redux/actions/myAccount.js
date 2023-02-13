import { getMyCarListings } from '../../services/myAccount'
import { FETCH_START, FETCH_SUCCESS, FETCH_ERROR, UPDATE_MYCAR_LISTINGS } from '../../constants/actionTypes'
import { SOMETHING_WENT_WRONG } from '../../constants/common'

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
