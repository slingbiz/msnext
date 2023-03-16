import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import StarIcon from '@mui/icons-material/StarBorder'
import { Paperclip } from 'mdi-material-ui'
import { Check } from '@mui/icons-material'

const tiers = [
  {
    title: 'Monthly',
    price_inr: '499',
    price_aed: '50',
    duration: 'month',
    description: ['Have a custom microsite', 'Promote your products', 'Email support'],
    buttonText: 'Buy Now'
  },
  {
    title: 'Yearly',
    price_inr: '4999',
    price_aed: '500',
    duration: 'year',
    description: [
      'Have a custom microsite',
      'Promote your products',
      'Priority email support',
      'All the car listings you add on Motorsingh will be promoted by default at the top of relevant search results'
    ],
    buttonText: 'Buy Now'
  }
]

const Cards = props => {
  const { country } = props

  return (
    <Container maxWidth='md' component='main' sx={{ mt: 5, py: 20 }}>
      <Grid container spacing={5} justifyContent='space-evenly' alignItems='stretch'>
        {tiers.map(tier => (
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
                  {country === 'in' ? `₹${tier.price_inr}` : `${tier.price_aed} AED`}
                </Typography>
                <Typography variant='body1' align='center' color='text.secondary' component='p' gutterBottom>
                  {country === 'in' ? `₹${tier.price_inr}` : `${tier.price_aed} AED`}/{tier.duration}
                </Typography>
                <Typography variant='button' align='center' color='text.primary' component='p' gutterBottom>
                  {tier.title === 'Monthly' ? 'Pay full' : `Save ${country === 'in' ? `₹ 1000` : `100 AED`}`}
                </Typography>
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
