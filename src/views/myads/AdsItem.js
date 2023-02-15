import Paper from '@mui/material/Paper'
import React from 'react'
import moment from 'moment'
import { Box, Button, Typography, Divider } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PhoneIcon from '@mui/icons-material/Phone'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { capFirst } from '../../helpers/common'

function AdsItem({ listing }) {
  console.log(listing, 'listing')

  return (
    <Paper sx={{ width: 'full', p: 2, display: 'flex', flexDirection: 'column', my: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}
      >
        <img
          src='https://i.imgur.com/CzXTtJV.jpg'
          alt='Picture of the author'
          style={{ width: '100%', height: 200, borderRadius: 5, flexBasis: 1, maxWidth: 300 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: [null, null, 3] }}>
          <Typography component='h3' sx={{ fontSize: 25, fontWeight: 500 }}>
            {listing?.title}
          </Typography>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 500, mt: 2 }}>
            AED<span style={{ fontSize: 24 }}> {listing?.price}</span>
          </Typography>
          <Box sx={{ display: 'flex', mt: 2, flexDirection: { xs: 'column', lg: 'row' } }}>
            <Box sx={{ display: 'flex', flex: '1 1 0', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
                Location :
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                {capFirst(listing?.city)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: '1 1 0', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
                Kilometers :
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                {listing?.kms_run}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: '1 1 0', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
                Year :
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                {listing?.year}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: ['100%', '100%', '100%', 250], mt: [2] }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='outlined' startIcon={<VisibilityIcon />} size='small'>
              0 Views
            </Button>
            <Button variant='contained' startIcon={<PhoneIcon />}>
              0 Calls
            </Button>
          </Box>
          <Button variant='contained' startIcon={<QuestionAnswerIcon />} sx={{ mt: 3 }}>
            0 Chats
          </Button>
          <Button variant='contained' startIcon={<WhatsAppIcon />} sx={{ mt: 3 }}>
            0 Whatsapp
          </Button>
        </Box>
      </Box>
      <Divider sx={{ my: 5 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
            Posted on <span style={{ fontWeight: 600 }}>{moment(listing?.added_on).toString()}</span>
          </Typography>
          <Divider orientation='vertical' sx={{ mx: 2 }} flexItem />
          <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
            Updated on <span style={{ fontWeight: 600 }}>{moment(listing?.updated_on).toString()}</span>
          </Typography>
        </Box>
        <Button variant='outlined' startIcon={<MoreHorizIcon />}>
          More
        </Button>
      </Box>
    </Paper>
  )
}

export default AdsItem
