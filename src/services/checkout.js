import apiAuth from './apiAuth'
import { SERVICE_URL } from '../constants/common'

const getPaymentConfig = async () => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.get(`${SERVICE_URL}/home/payment-config`)
}

const createPaymentIntent = async params => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.post(`${SERVICE_URL}/home/create-payment-intent`, params)
}

export { getPaymentConfig, createPaymentIntent }
