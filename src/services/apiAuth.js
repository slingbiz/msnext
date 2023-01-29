import axios from 'axios';

const axiosAuth = async () => {

  //TODO Add cookie info.
  return axios.create({
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: '*',

      // Authorization: 'Bearer ' + token,
    },
  });
};

export default axiosAuth;
