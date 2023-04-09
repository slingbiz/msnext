import axios from 'axios'
import parseCookies from '../../utils/parseCookies'

export const withMSNativeAuth = async (gssp) => {
  return async (context) => {
    const { req, res } = ctx;
    const cookies = parseCookies(req);

    const response = await axios.get('https://www.motorsingh.com/user/validate', {
      headers: { cookie: `PHPSESSID=${cookies.PHPSESSID};` }

      // headers: { cookie: `PHPSESSID=7e952iigfbbkvle1v0j61tn8c3` }
    })


    if (!response?.data?.user_id) {
      return {
        redirect: {
          destination: 'https://www.motorsingh.com', statusCode: 302
        }
      };
    }
    const user = response?.data;
    req.user = user;

    return {
      props: {
        ...gssp.props,
        user,
      },
    };
  }
}
