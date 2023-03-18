import React from 'react'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'

const Partners = () => {
  return (
    <Container
      sx={{
        minHeight: { xs: '30vh', lg: '40vh' },
        paddingY: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Typography variant='h4' fontWeight={700} align='center' color='primary' component='p' my={10}>
        Our Proud Partners
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        divider={<Divider orientation='vertical' flexItem />}
        spacing={5}
        alignItems='center'
        justifyContent='center'
        sx={{ flexWrap: 'wrap' }}
      >
        <img
          src='https://d2zv2ciw0ln4h1.cloudfront.net/uploads/ibm_1f63f8c1a8.svg'
          alt='ibm-logo'
          width={100}
          height={90}
        />
        <img
          src='https://d2zv2ciw0ln4h1.cloudfront.net/uploads/toyota_logo_2019_3700x1200_2e476d741d_125ba4e655.png'
          alt='toyota-logo'
          width={180}
          height={90}
        />
        <img
          src='https://d2zv2ciw0ln4h1.cloudfront.net/uploads/walmart_ca6a68695b.svg'
          alt='walmart-logo'
          width={180}
          height={90}
        />
        <img
          src='https://d2zv2ciw0ln4h1.cloudfront.net/uploads/nasa_cf7e56179f.svg'
          alt='nasa-logo'
          width={180}
          height={90}
        />
        <img
          src='https://d2zv2ciw0ln4h1.cloudfront.net/uploads/AECOM_9ac8e0780b_0fa59e7787.png'
          alt='aecom-logo'
          width={180}
          height={90}
        />
        <img
          src='https://d2zv2ciw0ln4h1.cloudfront.net/uploads/societe-generale_980651b2b8.svg'
          alt='sg-logo'
          width={180}
          height={90}
        />
      </Stack>
    </Container>
  )
}

export default Partners
