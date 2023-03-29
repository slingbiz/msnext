import React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, Container, Grid } from '@mui/material'

const testimonials = [
  {
    id: 1,
    name: 'Lakshmi Pathy',
    company: 'Individual',
    feedback:
      'I recently purchased a used car from this website and I have to say I was thoroughly impressed with the whole experience. The website was easy to navigate, the selection was great, and the prices were competitive. I found the car of my dreams and the whole process was smooth and stress-free. I would definitely recommend this website to anyone in the market for a used car'
  },
  {
    id: 2,
    name: 'Aswani',
    company: 'Dealer, Bangalore',
    feedback:
      'Working as a used car seller, I have had the opportunity to interact with many customers over the years. I pride myself on providing exceptional service, and I am committed to making sure that my customers are satisfied with their purchase. I always take the time to listen to my customers\' needs and preferences, and I work hard to help them find a car that meets all of their requirements'
  },
  {
    id: 3,
    name: 'Maulik Vaishnav',
    company: 'Used Car Dealer, Gugaon',
    feedback:
      'I recently sold a used car through my dealership, and I have to say that I was thoroughly impressed with the level of service provided to my customers. The team was professional, courteous, and always went above and beyond to ensure that the car-buying experience was enjoyable for everyone involved.'
  }
]

const Testimonials = () => {
  return (
    <Container
      sx={{
        minHeight: { xs: '50vh', lg: '70vh' },
        paddingBottom: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Typography variant='h4' fontWeight={700} align='center' color='text.primary' component='p' my={10} color={'#e15540'}>
        Here’s what our customers have to say about us
      </Typography>

      <Grid container spacing={4} justifyContent='center'>
        {testimonials.map(({ id, name, company, feedback }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card
              sx={{ minWidth: 345, height: 400, '&.MuiCard-root': { display: 'flex', flexDirection: 'column' } }}
              key={id}
            >
              <CardContent
                sx={{
                  '&.MuiCardContent-root': {
                    flexGrow: 1
                  }
                }}
              >
                <Typography variant='body2' color='text.secondary' mb={2} sx={{fontSize: "18px", fontWeight: "bold", margin: "1em 0"}}>
                  {company}
                </Typography>
                <Typography variant='button' sx={{textTransform: 'none'}}>{feedback}</Typography>
              </CardContent>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label='feedback'>
                    <Typography color='white'>{name[0].toUpperCase()}</Typography>
                  </Avatar>
                }
                title={
                  <Typography variant='h6' color='primary'>
                    {name}
                  </Typography>
                }
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Testimonials
