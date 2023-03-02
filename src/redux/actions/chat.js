import { getAllChatOfUser } from 'src/services/chat'
import { FETCH_START, FETCH_SUCCESS, FETCH_ERROR, GET_CHAT_OF_USER } from '../../constants/actionTypes'

import { SOMETHING_WENT_WRONG } from '../../constants/common'

export const getAllChatOfUserAction = params => {
  return async dispatch => {
    dispatch({ type: FETCH_START })

    try {
      const allChatOfUser = await getAllChatOfUser(params)
      console.log(allChatOfUser, ' --- allChatOfUser response')
      if (allChatOfUser.status === 200) {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({
          type: GET_CHAT_OF_USER,
          payload: allChatOfUser.data
        })
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: data?.message || SOMETHING_WENT_WRONG
        })
      }
    } catch (e) {
      console.log(e.message, ' --- allChatOfUser error')
      dispatch({
        type: FETCH_ERROR,
        payload: []
      })
    }
  }
}
