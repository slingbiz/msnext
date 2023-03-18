import React from 'react'
import Image from 'next/image'
import { Call, Check, DisplaySettings, Dvr, Facebook, Folder, SupportAgent } from '@mui/icons-material'
import { Box, Container, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

const firstListItems = [
  {
    title: 'Leads',
    secondary: 'Connect with potential buyers',
    icon: 'check'
  },
  {
    title: 'Facebook',
    secondary: 'Leverage the power of social media',
    icon: 'fb'
  },
  {
    title: 'Tracko',
    secondary: 'Monitor, analyze, & market effectively',
    icon: 'call'
  }
]

const secListItems = [
  {
    title: 'CRM/LMS',
    secondary: 'Revolutionize data-management',
    icon: 'desk'
  },
  {
    title: 'Websites',
    secondary: 'Be visible to the world',
    icon: 'web'
  },
  {
    title: '24x7 Support',
    secondary: 'Reach us anytime!',
    icon: 'support'
  }
]

const ImageContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Lists = () => {
  const theme = useTheme()

  return (
    <Box sx={{ width: '100%', backgroundColor: '#F4F5FA' }}>
      <Container>
        <Box
          width='100%'
          display='flex'
          alignItems='center'
          paddingTop={10}
          sx={{ flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'center', sm: 'space-between' } }}
        >
          <List sx={{ width: { xs: '80%', sm: 'auto' }, minWidth: { xs: 200, sm: 350 } }}>
            {firstListItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{ flexDirection: { xs: 'row', md: 'row-reverse' }, textAlign: { xs: 'left', md: 'right' } }}
              >
                <ListItemAvatar sx={{ margin: { sm: '0 1rem 0 0', md: '0 0 0 1rem' } }}>
                  {item.icon === 'check' && <Check color='primary' fontSize='large' />}
                  {item.icon === 'fb' && <Facebook color='primary' fontSize='large' />}
                  {item.icon === 'call' && <Call color='primary' fontSize='large' />}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant='h6' color='primary'>
                      {item.title}
                    </Typography>
                  }
                  secondary={item.secondary}
                />
              </ListItem>
            ))}
          </List>

          <ImageContainer className='image-container'>
            <Image
              src='/images/xbanner.webp'
              width={600}
              height={600}
              objectFit='scale-down'
              objectPosition='bottom'
              alt='banner'
            />
          </ImageContainer>

          <List sx={{ width: { xs: '80%', sm: 'auto' }, minWidth: { xs: 200, sm: 350 } }}>
            {secListItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  {item.icon === 'desk' && <Dvr color='primary' fontSize='large' />}
                  {item.icon === 'web' && <DisplaySettings color='primary' fontSize='large' />}
                  {item.icon === 'support' && <SupportAgent color='primary' fontSize='large' />}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant='h6' color='primary'>
                      {item.title}
                    </Typography>
                  }
                  secondary={item.secondary}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  )
}

export default Lists
