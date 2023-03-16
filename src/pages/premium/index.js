// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Components
import { styled, useTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayoutWHeader from 'src/@core/layouts/BlankLayoutWHeader'

// ** Demo Imports
import Cards from './Cards'
import Lists from './Lists'
import FAQ from './FAQ'
import Testimonials from './Testimonials'
import Partners from './Partners'

const HeroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start'
}))

const PremiumPage = () => {
  // ** State

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  // ** Default Country
  const country = 'in'

  return (
    <Box display='flex' flexDirection='column'>
      <HeroContainer className='hero-container' sx={{ paddingBottom: { xs: '10px', lg: 0 } }}>
        <Box mt={20} mb={10} px={5}>
          <Typography component='h1' variant='h3' align='center' fontWeight={600} color='text.primary' gutterBottom>
            Grow Your Business with Simplified Digital Solutions
          </Typography>
          <Typography variant='h5' align='center' color='text.secondary' component='p'>
            Going digital is now easy
          </Typography>
        </Box>

        <Lists />
      </HeroContainer>

      <Cards country={country} />

      <Partners />

      <FAQ />

      <Testimonials />
    </Box>
  )
}
PremiumPage.getLayout = page => <BlankLayoutWHeader>{page}</BlankLayoutWHeader>

export default PremiumPage
