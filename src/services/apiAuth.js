import axios from 'axios';

const axiosAuth = async () => {

  return axios.create({
    withCredentials: true, // To pass cookie information
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: '*',

      // Authorization: 'Bearer ' + token,
    },
  });
};

export default axiosAuth;
