// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Head from 'next/head'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'


// ** Demo Tabs Imports
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import axiosAuth from 'src/services/apiAuth';

const axios = axiosAuth();

import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserAction } from 'src/redux/actions/myAccount'
import DefaultLoader from '../../@core/components/loader/default'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = props => {
  // ** State
  const [value, setValue] = useState('account')

  const dispatch = useDispatch()

  console.log(props, 'props@AccountSettings')
  const loggedUser = useSelector(({ myAccount }) => myAccount.singleUser)

  useEffect(() => {

    // declare the data fetching function
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.motorsingh.com/user/validate')

        // const response = await axios.get('https://www.motorsingh.com/user/validate', {
        //   headers: { cookie: `PHPSESSID=7e952iigfbbkvle1v0j61tn8c3` }
        // });

        const { user_id: userIdLocal } = response?.data;
        if (userIdLocal) {
          dispatch(getSingleUserAction({ userId: userIdLocal }))
        } else {
          //Redirect to login page
          window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";
        }

      } catch (e) {
        console.log(e, 'error@AccountSettings@getInitialProps')
        window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";
      }
    }

    // call the function
    fetchData()
      .catch(console.error);
  }, [])



  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Head>
        <title>Edit my information - My Account </title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='account'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountOutline />
                  <TabName>Account</TabName>
                </Box>
              }
            />
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LockOpenOutline />
                  <TabName>Security</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value='account'>
            <TabAccount loggedUser={loggedUser ? loggedUser[0] : {}} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='security'>
            <TabSecurity loggedUser={loggedUser ? loggedUser[0] : {}} />
          </TabPanel>
        </TabContext>
        <DefaultLoader />
      </Card>
    </>
  )
}

AccountSettings.getInitialProps = async (ctx) => {
  const { req } = ctx;

  // Run only on client side
  if (!req) {
    console.log('@client  - AccountSettings');

    try {

      const response = await axios.get('https://www.motorsingh.com/user/validate')

      // const response = await axios.get('https://www.motorsingh.com/user/validate', {
      //   headers: { cookie: `PHPSESSID=7e952iigfbbkvle1v0j61tn8c3` }
      // });

      if (!response?.data?.user_id) {
        window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";

        return {
          props: {}
        }
      }
      const user = response?.data || {};

      return {
        user
      }
    } catch (e) {
      console.log(e, 'error@AccountSettings@getInitialProps')
      window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";
    }
  }

  if (req) {
    console.log('@server  - AccountSettings')
  }

  return {}
}

export default AccountSettings
