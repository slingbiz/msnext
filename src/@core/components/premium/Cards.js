import React, { useEffect, useState } from 'react'
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
import { getProducts } from 'src/services/checkout'

const tiers = [
  {
    description: ['Have a custom microsite', 'Promote your products', 'Email support'],
    duration: 'month'
  },
  {
    description: [
      'Have a custom microsite',
      'Promote your products',
      'Priority email support',
      'All the car listings you add on Motorsingh will be promoted by default at the top of relevant search results'
    ],
    duration: 'year'
  }
]

const Cards = props => {
  const { country } = props
  const [products, setProducts] = useState([])
  const [currency, setCurrency] = useState('inr')

  console.log('Products => ', products)

  useEffect(() => {
    if (country === 'IN') {
      setCurrency('inr')
    } else {
      setCurrency('aed')
    }
  }, [country])

  useEffect(() => {
    getProducts()
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => console.error('Error => ', err))
  }, [])

  return (
    <Container maxWidth='md' component='main' sx={{ mt: 5, py: 20 }}>
      <Grid container spacing={5} justifyContent='space-evenly' alignItems='stretch'>
        {products
          .filter(item => item.currency === currency)
          .map(product => (
            <Grid item key={product.id} xs={10} sm={6} md={5}>
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
                  color={product.title === 'Monthly' ? '#804BDF' : '#e15540'}
                  gutterBottom
                  fontWeight={600}
                  sx={{ letterSpacing: '.5px' }}
                >
                  {product.name}
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
                    {`${product.currency} ${product.price / 100}`.toUpperCase()}
                  </Typography>
                  <Typography variant='body1' align='center' color='text.secondary' component='p' gutterBottom>
                    {`${product.currency} ${product.price / 100}`}/{product.interval}
                  </Typography>
                  <Typography variant='button' align='center' color='text.primary' component='p' gutterBottom>
                    {product.interval === 'month' ? 'Pay full' : `Save 2 months`}
                  </Typography>
                  <Link
                    href={{ pathname: '/checkout', query: { priceId: product.priceId, interval: product.interval } }}
                    passHref
                  >
                    <Button
                      size='medium'
                      variant='contained'
                      sx={{
                        backgroundColor: product.title === 'Monthly' ? '#804BDF' : '#e15540',
                        '&:hover': {
                          backgroundColor: product.title === 'Monthly' ? '#e15540' : '#804BDF'
                        }
                      }}
                    >
                      Buy Now
                    </Button>
                  </Link>
                </Paper>

                <CardContent sx={{ flexGrow: 1 }}>
                  {tiers
                    .filter(item => item.duration === product.interval)
                    .map(tier => (
                      <List key={tier.duration}>
                        {tier.description.map((line, index) => (
                          <ListItem key={index}>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  fontSize: 'small',
                                  backgroundColor: '#fefefe',
                                  color: product.title === 'Monthly' ? '#804BDF' : '#e15540'
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
                    ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default Cards
