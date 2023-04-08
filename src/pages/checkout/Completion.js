import React from 'react'
import Link from 'next/link'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material'
import { Check } from '@mui/icons-material'

import BlankLayoutWHeader from 'src/@core/layouts/BlankLayoutWHeader'

const benefits = [
  {
    title: 'Leads',
    secondary: 'Connect with potential buyers',
    icon: 'check'
  },
  {
    title: 'Instagram',
    secondary: 'Leverage the power of social media',
    icon: 'insta'
  },
  {
    title: 'Tracko',
    secondary: 'Monitor, analyze, & market effectively',
    icon: 'call'
  },
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

const Completion = props => {
  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Box paddingY={20} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Typography variant='h4' textAlign='center' sx={{ textTransform: 'uppercase' }} gutterBottom>
              Payment completed 🎉
            </Typography>
            <Typography variant='body1' textAlign='center' gutterBottom>
              Thank you for your purchase. You will receive an email confirmation shortly.
            </Typography>
          </Box>

          <Divider sx={{ marginY: 5 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h5' textAlign='center' gutterBottom>
              You have unlocked the following benefits
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {benefits?.map((item, index) => (
                <Grid item xs={4} sm={4} md={4} key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          fontSize: 'small',
                          backgroundColor: '#fefefe',
                          color: '#e15540'
                        }}
                      >
                        <Check />
                      </Avatar>
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
                </Grid>
              ))}
            </Grid>

            <Box
              width='100%'
              marginTop={20}
              marginBottom={10}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <Typography variant='h6' textAlign='center' gutterBottom>
                Grow your business by contacting potential customers directly
              </Typography>
              <Link href={`/leads`} passHref>
                <Button variant='contained' sx={{ marginLeft: 1, marginRight: 1 }}>
                  View Leads
                </Button>
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

Completion.getLayout = page => <BlankLayoutWHeader>{page}</BlankLayoutWHeader>

export default Completion
