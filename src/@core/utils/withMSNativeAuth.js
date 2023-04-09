import axiosAuth from 'src/services/apiAuth';

const axios = axiosAuth();
import parseCookies from '../../utils/parseCookies'

export const withMSNativeAuth = async (gssp) => {
  return async (context) => {
    const { req, res } = ctx;
    const cookies = parseCookies(req);

    const response = await axios.get('https://www.motorsingh.com/user/validate')

    if (!response?.data?.user_id) {
      return {
        redirect: {
          destination: 'https://www.motorsingh.com', statusCode: 302
        }
      };
    }
    const user = response?.data;
    if (req) {
      req.user = user
    }

    return {
      props: {
        ...gssp.props,
        user,
      },
    };
  }
}
