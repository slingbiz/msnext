import apiAuth from './apiAuth'
import { SERVICE_URL } from '../constants/common'
import axios from 'axios'

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

const getMyRFQListings = async params => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.post(`${SERVICE_URL}/myAccount/getMyRFQListings`, params)
}

const updateStatus = async params => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.patch(`${SERVICE_URL}/myAccount/getMyLeadListings`, params)
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

const getBrands = async params => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.post(`${SERVICE_URL}/home/getBrands`, params)
}

const getModels = async params => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.post(`${SERVICE_URL}/home/getModels`, params)
}

const getCities = async searchText => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.get(`${SERVICE_URL}/home/getCities?q=${searchText}`)
}

const addLeads = async formData => {
  const response = await axios.post(`${SERVICE_URL}/myAccount/addLeads/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response
}

export {
  getMyCarListings,
  getMyLeadListings,
  getMyRFQListings,
  updateStatus,
  updateUser,
  getSingleUser,
  getBrands,
  getModels,
  getCities,
  addLeads
}
