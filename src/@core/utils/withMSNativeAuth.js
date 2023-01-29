import axios from 'axios'

export const withMSNativeAuth = async (gssp) => {
  return async (context) => {
    const {req, res} = context;

    const response = await axios.get('https://www.motorsingh.com/user/validate', {
      headers: {cookie: `PHPSESSID=${req.cookies.PHPSESSID};`}
    });

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
