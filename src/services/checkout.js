import apiAuth from './apiAuth'
import { SERVICE_URL } from '../constants/common'

const getProducts = async () => {
  const Api = await apiAuth()
  if (!Api) {
    return
  }

  return Api.get(`${SERVICE_URL}/home/getProducts`)
}

export { getProducts }
