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
    name: 'John Doe',
    company: 'ABC Inc.',
    feedback:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus efficitur faucibus tellus sit amet rutrum.'
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'XYZ Corp.',
    feedback:
      'Integer quis leo euismod, elementum ante eu, imperdiet ex. Aenean rhoncus nisl in sapien egestas, non sollicitudin turpis accumsan.'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    company: '123 Industries',
    feedback:
      'Sed laoreet nibh eget tellus ullamcorper iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce sagittis tristique diam, in ultrices mi imperdiet at.'
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
      <Typography variant='h3' fontWeight={700} align='center' color='text.primary' component='p' my={10}>
        Here’s what dealers have to say about us
      </Typography>

      <Grid container spacing={4} justifyContent='center'>
        {testimonials.map(({ id, name, company, feedback }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card
              sx={{ minWidth: 345, height: 300, '&.MuiCard-root': { display: 'flex', flexDirection: 'column' } }}
              key={id}
            >
              <CardContent
                sx={{
                  '&.MuiCardContent-root': {
                    flexGrow: 1
                  }
                }}
              >
                <Typography variant='body2' color='text.secondary' mb={2}>
                  {company}
                </Typography>
                <Typography variant='button'>{feedback}</Typography>
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
