// ** React Imports
import React, { useEffect, useState } from 'react'
import useLocation from 'src/@core/hooks/useLocation'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryAction } from 'src/redux/actions/myAccount'
import Head from 'next/head'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayoutWHeader from 'src/@core/layouts/BlankLayoutWHeader'

// ** Demo Imports
import Cards from '../../@core/components/premium/Cards'
import Lists from 'src/@core/components/premium/Lists'
import Partners from 'src/@core/components/premium/Partners'
import FAQ from 'src/@core/components/premium/FAQ'
import Testimonials from 'src/@core/components/premium/Testimonials'

const HeroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start'
}))

const PremiumPage = () => {
  // ** Hook
  const theme = useTheme()
  const dispatch = useDispatch()
  const location = useLocation()

  // ** State
  const userCountry = useSelector(({ myAccount }) => myAccount.location)

  useEffect(() => {
    if (location.country) {
      dispatch(getCountryAction({ country: location.country }))
    }
  }, [dispatch, location])

  return (
    <>
      <Head>
        <title>Motorsingh - Become a Premium Member </title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Box display='flex' flexDirection='column'>
        <HeroContainer
          className='hero-container'
          sx={{ paddingBottom: { xs: '10px', lg: 0, boxShadow: '1px 1px 12px rgba(0,0,0,.15)' } }}
        >
          <Box mt={20} mb={10} px={5}>
            <Typography component='h1' variant='h3' align='center' fontWeight={600} color='text.primary' gutterBottom>
              Grow Your Business
            </Typography>
            <Typography component='h4' variant='h3' align='center' fontWeight={600} color='text.primary' gutterBottom>
              with Simplified Digital Solutions
            </Typography>
            <Typography variant='h5' align='center' color='text.secondary' component='p'>
              {/*Going digital is now easy*/}
            </Typography>
          </Box>

          <Lists />
        </HeroContainer>

        <Cards country={userCountry} />

        <Partners />

        <FAQ />

        <Testimonials />
      </Box>
    </>
  )
}
PremiumPage.getLayout = page => <BlankLayoutWHeader>{page}</BlankLayoutWHeader>

export default PremiumPage
