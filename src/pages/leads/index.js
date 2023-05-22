// ** React Imports
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserAction, getBrandsAction } from 'src/redux/actions/myAccount'
import {fetchStart, fetchSuccess, fetchError} from 'src/redux/actions/common';
import axiosAuth from 'src/services/apiAuth';

const axios = axiosAuth();
import Head from 'next/head'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import { AccountMultipleOutline, NoteEditOutline } from 'mdi-material-ui'

// ** Tabs Imports
import RFQ from 'src/views/leads/RFQ'
import Lead from 'src/views/leads/Lead'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
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

const LeadsPage = props => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('rfq')
  const { user } = props

  const userId = user?.user_id
  const loggedUser = useSelector(({ myAccount }) => myAccount.singleUser)
  const brands = useSelector(({ myAccount }) => myAccount.brands)

  useEffect(() => {

    // declare the data fetching function
    const fetchData = async () => {
      try {
        dispatch(fetchStart())

        const response = await axios.get('https://www.motorsingh.com/user/validate')

        // const response = await axios.get('https://www.motorsingh.com/user/validate', {
        //   headers: { cookie: `PHPSESSID=7e952iigfbbkvle1v0j61tn8c3` }
        // });
        dispatch(fetchSuccess());

        const { user_id: userIdLocal } = response?.data;
        if (userIdLocal) {
          dispatch(getSingleUserAction({ userId: userIdLocal }))
        } else {
          //Redirect to login page
          window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";
        }

      } catch (e) {
        dispatch(fetchError());

        console.log(e, 'error@AccountSettings@getInitialProps')
        window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";
      }
    }

    // call the function
    fetchData()
      .catch(console.error);
  }, [])


  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(getSingleUserAction({ userId }))
      dispatch(getBrandsAction())
    }
  }, [dispatch, userId])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Head>
        <title>View Leads & RFQ - My Account </title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='rfq-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='rfq'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <NoteEditOutline />
                  <TabName>My RFQs</TabName>
                </Box>
              }
            />
            <Tab
              value='leads'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountMultipleOutline />
                  <TabName>My Leads</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value='rfq'>
            <RFQ brands={brands} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='leads'>
            <Lead brands={brands} loggedUser={loggedUser} />
          </TabPanel>
        </TabContext>
        <DefaultLoader />
      </Card>
    </>
  )
}

LeadsPage.getInitialProps = async (ctx) => {
  const { req } = ctx;

  // Run only on client side
  if (!req) {
    try {
      const response = await axios.get('https://www.motorsingh.com/user/validate')
      if (!response?.data?.user_id) {
        window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";

        return {
          props: {}
        }
      }
      const user = response?.data;

      return {
        user
      }
    } catch (e) {
      console.log(e, 'error@LeadsPage@getInitialProps')
      window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";
    }
  }

  if (req) {
    console.log('@server  - AccountSettings')
  }

  return {}
}

export default LeadsPage
