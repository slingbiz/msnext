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
  const { user } = props
  const userId = user?.user_id
  console.log(props, 'props@AccountSettings')
  const loggedUser = useSelector(({ myAccount }) => myAccount.singleUser)
  console.log(loggedUser, 'loggedUser')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(getSingleUserAction({ userId }))
    }
  }, [dispatch, userId])

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
    const response = await axios.get('https://www.motorsingh.com/user/validate')
    if (!response?.data?.user_id) {
      return {
        props: {}
      }
    }
    const user = response?.data;

    return {
      user
    }
  }

  if (req) {
    console.log('@server  - AccountSettings')
  }

  return {}
}

export default AccountSettings
