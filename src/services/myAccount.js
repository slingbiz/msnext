import apiAuth from './apiAuth';
import {SERVICE_URL} from "../constants/common";

const getMyCarListings = async (params) => {
  const Api = await apiAuth();
  if (!Api) {
    return;
  }

  return Api.POST(`${SERVICE_URL}/myAccount/getMyCarListings`, params);
};

export {getMyCarListings};
