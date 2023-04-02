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
import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'

const tiers = [
  {
    description: [
      'Have a custom microsite',
      'Promote your products',
      'Email support',
      'Push your cars to 1000s of buyers'
    ],
    duration: 'month'
  },
  {
    description: [
      'Have a custom microsite',
      'Promote your products',
      'Priority email support',
      'All the car listings you add on Motorsingh will be promoted by default at the top of relevant search results',
      'Save 2 months cost'
    ],
    duration: 'year'
  }
]

const Cards = props => {
  const { country } = props
  const [data, setData] = useState([])
  const [currency, setCurrency] = useState('inr')

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
        setData(res.data)
      })
      .catch(err => console.error('Error => ', err))
  }, [])

  return (
    <Container maxWidth='md' component='main' sx={{ mt: 5, py: 20 }}>
      <Grid container spacing={5} justifyContent='space-evenly' alignItems='stretch'>
        {data?.products
          ?.filter(item => item.currency === currency)
          .map(product => (
            <Grid item key={product.id} xs={10} sm={6} md={5}>
              <Card
                sx={{
                  height: '100%',
                  padding: '20px 10px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#f6f6fe'
                }}
              >
                <Typography
                  component='p'
                  variant='p'
                  align='center'
                  color={product.interval != 'month' ? '#804BDF' : '#e15540'}
                  gutterBottom
                  fontWeight={600}
                  sx={{ letterSpacing: '.5px', paddingBottom: '15px', textTransform: 'uppercase' }}
                >
                  {product.name}
                </Typography>

                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    height: 250,
                    padding: '0 30px'
                  }}
                >
                  <Box>
                    <Typography
                      component='h2'
                      variant='h4'
                      align='center'
                      sx={{ color: '#60606f', fontWeight: 'bold' }}
                      gutterBottom
                    >
                      {`${product.currency} ${product.price / 100}`.toUpperCase()}
                    </Typography>
                    <Typography variant='body1' align='center' color='text.secondary' component='p' gutterBottom>
                      <span style={{ textTransform: 'uppercase' }}>{`${product.currency}`}</span>
                      {` ${product.price / 100}`}/{product.interval}
                    </Typography>
                    <Typography variant='button' align='center' color='text.primary' component='p' gutterBottom>
                      {product.interval === 'month' ? 'Pay full' : `Save 2 months`}
                    </Typography>
                  </Box>
                  <Link
                    href={
                      product.currency === 'inr' && product.interval === 'month'
                        ? data.links.inr_monthly_link
                        : product.currency === 'inr' && product.interval === 'year'
                        ? data.links.inr_yearly_link
                        : product.currency === 'aed' && product.interval === 'month'
                        ? data.links.aed_monthly_link
                        : data.links.aed_yearly_link
                    }
                    passHref
                  >
                    <Button
                      fullWidth={true}
                      size='medium'
                      variant='contained'
                      sx={{
                        backgroundColor: product.interval === 'month' ? '#e15540' : '#804BDF',
                        '&:hover': {
                          backgroundColor: product.interval === 'month' ? '#de3c23' : '#540cd6'
                        }
                      }}
                    >
                      Buy Now
                    </Button>
                  </Link>
                </Paper>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    component='p'
                    variant='p'
                    align='center'
                    color={product.interval != 'month' ? '#804BDF' : '#e15540'}
                    gutterBottom
                    fontWeight={600}
                    sx={{
                      letterSpacing: '.5px',
                      paddingBottom: '15px',
                      textTransform: 'uppercase',
                      textAlign: 'left',
                      marginTop: 2
                    }}
                  >
                    {product.name}
                  </Typography>
                  {tiers
                    .filter(item => item.duration === product.interval)
                    .map(tier => (
                      <List key={tier.duration}>
                        {tier.description.map((line, index) => (
                          <ListItem key={index} style={{ padding: '0 10px 0 10px', marginBottom: 5 }}>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  fontSize: 'small',
                                  height: '25px',
                                  width: '25px',
                                  backgroundColor: '#fefefe',
                                  color: product.interval != 'Monthly' ? '#804BDF' : '#e15540'
                                }}
                              >
                                <Check sx={{ width: '15px' }} />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={line}
                              primaryTypographyProps={{
                                fontSize: { xs: '16px', sm: '16px', fontWeight: 500, color: grey[600] }
                              }}
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
