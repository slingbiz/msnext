import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material'

import Account from 'mdi-material-ui/Account'
import { useDispatch, useSelector } from 'react-redux'

import AdsItem from '../../views/myads/AdsItem.js'
import axiosAuth from 'src/services/apiAuth';

const axios = axiosAuth();
import React, { useEffect } from 'react'
import { getMyCarListingsAction } from '../../redux/actions/myAccount'

import DefaultLoader from '../../@core/components/loader/default'
import Head from 'next/head'
import parseCookies from '../../utils/parseCookies'

const MyAdsPage = props => {
  const dispatch = useDispatch()

  const theme = useTheme()
  const { user } = props

  const userId = user?.user_id
  const loggedUser = useSelector(({ myAccount }) => myAccount.singleUser)
  
  const myCarListings = useSelector(({ myAccount }) => myAccount.myCarListings)

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
          // window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";
        }

      } catch (e) {
        console.log(e, 'error @MyCars @getInitialProps')
        window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";
      }
    }

    // call the function
    fetchData()
      .catch(console.error);
  }, [])


  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(getMyCarListingsAction({}))
    }
  }, [dispatch])

  console.log(user, 'user')

  return (
    <>
      <Head>
        <title>View my uploaded cars - My Account </title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Card sx={{ width: '100%' }}>
        <CardHeader
          title={
            <Typography variant='h6' sx={{ textTransform: 'uppercase' }}>
              My account
            </Typography>
          }
        />
        <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Account fontSize='large' />
            <Typography variant='h5' sx={{ ml: 5 }}>
              {user?.username || 'No User found'}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              justifyContent: 'space-between',
              width: '100%',
              mt: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Button variant='outlined' size='small'>
                Edit Profile
              </Button>
              <Button variant='outlined' size='small' sx={{ ml: 3 }}>
                Change Password
              </Button>
            </Box>
            <Box sx={{ display: 'flex', mt: { xs: 3, lg: 0 }, alignItems: 'center' }}></Box>
          </Box>
          <Divider sx={{ my: 5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }} variant='h6'>
              My car ads
            </Typography>
            <Typography sx={{ cursor: 'pointer' }} variant='body2'>
              Clear filters
            </Typography>
          </Box>
          <Grid container sx={{ mt: 1 }} spacing={5}>
            <Grid item lg={3} xs={12}>
              <FormControl fullWidth size='small' disabled={true}>
                <InputLabel id='form-layouts-separator-select-label'>Select Make</InputLabel>
                <Select
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} xs={12}>
              <FormControl fullWidth size='small' disabled={true}>
                <InputLabel id='form-layouts-separator-select-label'>Select Model</InputLabel>
                <Select
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} xs={12}>
              <FormControl fullWidth size='small' disabled={true}>
                <InputLabel id='form-layouts-separator-select-label'>Latest First</InputLabel>
                <Select
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} xs={12}>
              <Button
                size='small'
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
                variant='containd'
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <Paper
            elevation={0}
            sx={{ background: theme.palette.grey[200], p: 5, mt: 5, display: 'flex', flexDirection: 'column' }}
          >
            <Typography sx={{ color: theme.palette.common.black, fontWeight: 600, textAlign: 'right' }}>
              Displaying {myCarListings.length} Ads listing
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs aria-label='basic tabs example' variant='scrollable'>
                <Tab label={`Active (0)`} />
                <Tab label={`Awaiting Review (0)`} />
                <Tab label={`Incomplete (0)`} />
                <Tab label={`Deactive (0)`} />
              </Tabs>
              {console.log(myCarListings, 'myCarListings')}
              {myCarListings?.map((listing, k) => {
                return <AdsItem key={k} listing={listing} />
              })}
            </Box>
          </Paper>
        </CardContent>
        <DefaultLoader />
      </Card>
    </>
  )
}

MyAdsPage.getInitialProps = async (ctx) => {
  const { req } = ctx;

  // Run only on client side
  if (!req) {
    try {
      const response = await axios.get('https://www.motorsingh.com/user/validate')
      if (!response?.data?.user_id) {
        // window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";

        return {
          props: {}
        }
      }

      const user = response?.data;

      return {
        user
      }
    } catch (e) {
      console.log(e, 'error@MyAdsPage@getInitialProps')
      window.location.href = "https://www.motorsingh.com/sell-my-car/start#login";
    }
  }

  if (req) {
    console.log('@server  - AccountSettings')
  }

  return {}
}

export default MyAdsPage
