import apiAuth from './apiAuth'
import { SERVICE_URL } from '../constants/common'

const getMyCarListings = async params => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.post(`${SERVICE_URL}/myAccount/getMyCarListings`, params)
}

const getMyLeadListings = async params => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.post(`${SERVICE_URL}/myAccount/getMyLeadListings`, params)
}

export { getMyCarListings, getMyLeadListings }

