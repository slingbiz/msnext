import apiAuth from './apiAuth'
import { SERVICE_URL } from '../constants/common'

const getMyCarListings = async params => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  console.log(SERVICE_URL, ' SERVICE_URL')

  return Api.post(`${SERVICE_URL}/myAccount/getMyCarListings`, params)
}

export { getMyCarListings }
