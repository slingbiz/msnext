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

const updateUser = async params => {
  const { id, values } = params

  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.patch(`${SERVICE_URL}/users/${id}`, values)
}

const getSingleUser = async params => {
  const { userId } = params

  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.get(`${SERVICE_URL}/users/${userId}`)
}

export { getMyCarListings, getMyLeadListings, updateUser, getSingleUser }
