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
          src='/images/clients/client-hertz.png'
          alt='hertz-logo'

          height={60}
        />
        <img
          src='/images/clients/client-cardekho.png'
          alt='cardekho-logo'

          height={60}
        />
        <img
          src='https://d2zv2ciw0ln4h1.cloudfront.net/uploads/toyota_logo_2019_3700x1200_2e476d741d_125ba4e655.png'
          alt='toyota-logo'

          height={60}
        />
        <img
          src='https://theme.zdassets.com/theme_assets/598226/cb98acab570d9eeddf3a023464e4031d5f5e19b0.png'
          alt='olx-log'

          height={60}
        />


      </Stack>
    </Container>
  )
}

export default Partners
