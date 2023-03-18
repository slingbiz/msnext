import React from 'react'
import Link from 'next/link'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import { Check } from '@mui/icons-material'

const tiers = [
  {
    buttonText: 'Buy Now',
    country: 'IN',
    currency: 'INR',
    description: ['Have a custom microsite', 'Promote your products', 'Email support'],
    duration: 'month',
    title: 'Monthly',
    price: '499'
  },
  {
    buttonText: 'Buy Now',
    country: 'IN',
    currency: 'INR',
    description: [
      'Have a custom microsite',
      'Promote your products',
      'Priority email support',
      'All the car listings you add on Motorsingh will be promoted by default at the top of relevant search results'
    ],
    duration: 'year',
    price: '4999',
    save: '1000',
    title: 'Yearly'
  },
  {
    buttonText: 'Buy Now',
    country: 'PK',
    currency: 'INR',
    description: ['Have a custom microsite', 'Promote your products', 'Email support'],
    duration: 'month',
    title: 'Monthly',
    price: '499'
  },
  {
    buttonText: 'Buy Now',
    country: 'PK',
    currency: 'INR',
    description: [
      'Have a custom microsite',
      'Promote your products',
      'Priority email support',
      'All the car listings you add on Motorsingh will be promoted by default at the top of relevant search results'
    ],
    duration: 'year',
    price: '4999',
    save: '1000',
    title: 'Yearly'
  },
  {
    buttonText: 'Buy Now',
    country: 'AE',
    currency: 'AED',
    description: ['Have a custom microsite', 'Promote your products', 'Email support'],
    duration: 'month',
    price: '50',
    title: 'Monthly'
  },
  {
    buttonText: 'Buy Now',
    country: 'AE',
    currency: 'AED',
    description: [
      'Have a custom microsite',
      'Promote your products',
      'Priority email support',
      'All the car listings you add on Motorsingh will be promoted by default at the top of relevant search results'
    ],
    duration: 'year',
    price: '500',
    save: '100',
    title: 'Yearly'
  }
]

const Cards = props => {
  const { country } = props

  return (
    <Container maxWidth='md' component='main' sx={{ mt: 5, py: 20 }}>
      <Grid container spacing={5} justifyContent='space-evenly' alignItems='stretch'>
        {tiers
          .filter(item => item.country === country)
          .map(tier => (
            <Grid item key={tier.title} xs={10} sm={6} md={5}>
              <Card
                sx={{
                  height: '100%',
                  padding: '24px 10px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#f6f6fe'
                }}
              >
                <Typography
                  component='p'
                  variant='p'
                  align='center'
                  color={tier.title === 'Monthly' ? '#804BDF' : '#e15540'}
                  gutterBottom
                  fontWeight={600}
                  sx={{ letterSpacing: '.5px' }}
                >
                  {tier.title === 'Monthly' ? 'Pro' : 'Pro Plus'}
                </Typography>

                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 250
                  }}
                >
                  <Typography component='h2' variant='h3' align='center' color='#1d1b84' gutterBottom>
                    {`${tier.currency} ${tier.price}`}
                  </Typography>
                  <Typography variant='body1' align='center' color='text.secondary' component='p' gutterBottom>
                    {`${tier.currency} ${tier.price}`}/{tier.duration}
                  </Typography>
                  <Typography variant='button' align='center' color='text.primary' component='p' gutterBottom>
                    {tier.title === 'Monthly' ? 'Pay full' : `Save ${tier.currency} ${tier.save}`}
                  </Typography>
                  <Link
                    href={{ pathname: '/checkout', query: { currency: tier.currency, amount: tier.price } }}
                    passHref
                  >
                    <Button
                      size='medium'
                      variant='contained'
                      sx={{
                        backgroundColor: tier.title === 'Monthly' ? '#804BDF' : '#e15540',
                        '&:hover': {
                          backgroundColor: tier.title === 'Monthly' ? '#e15540' : '#804BDF'
                        }
                      }}
                    >
                      {tier.buttonText}
                    </Button>
                  </Link>
                </Paper>

                <CardContent sx={{ flexGrow: 1 }}>
                  <List>
                    {tier.description.map((line, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              fontSize: 'small',
                              backgroundColor: '#fefefe',
                              color: tier.title === 'Monthly' ? '#804BDF' : '#e15540'
                            }}
                          >
                            <Check />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={line}
                          primaryTypographyProps={{ fontSize: { xs: '1.125rem', sm: '1.3rem' } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default Cards
