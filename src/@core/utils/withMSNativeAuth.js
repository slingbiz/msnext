import axios from 'axios';

export const withMSNativeAuth = async (gssp) => {
  return async (context) => {
    const {req, res} = context;
    const response = await axios.get('https://www.motorsingh.com/user/validate', {
      headers: {cookie: `PHPSESSID=${req.cookies.PHPSESSID};`}
    });
    if (!response?.data?.user_id) {
      return {
        redirect: {
          destination: '/admin/login', statusCode: 302
        }
      };
    }
    req.session = response?.data;

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  }
}
