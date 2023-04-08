// ** React Imports
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserAction, getBrandsAction } from 'src/redux/actions/myAccount'
import axios from 'axios'
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
    dispatch(getSingleUserAction({ userId }))
    dispatch(getBrandsAction())
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

export async function getinitialprops(ctx) {
  const { req, res } = ctx

  const response = await axios.get('https://www.motorsingh.com/user/validate', {
    headers: { cookie: `PHPSESSID=${req.cookies.PHPSESSID};` }
  })

  if (!response?.data?.user_id) {
    // return {
    //   redirect: {
    //     destination: 'https://www.motorsingh.com', statusCode: 302
    //   }
    // };
    return {
      props: {}
    }
  }
  const user = response?.data
  req.user = user

  return {
    props: { user }
  }
}

export default LeadsPage
