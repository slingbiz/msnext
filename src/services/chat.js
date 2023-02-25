import apiAuth from './apiAuth'
import { SERVICE_URL } from '../constants/common'

const getAllChatOfUser = async params => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.post(`${SERVICE_URL}/chats`, params)
}

export { getAllChatOfUser }
