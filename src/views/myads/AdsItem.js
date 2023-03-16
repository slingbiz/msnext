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
    <Paper sx={{ width: 'full', p: 2, display: 'flex', flexDirection: 'column', my: 2, marginBottom: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}
        style={{ padding: '5px' }}
      >
        <img
          src={listing.img_src}
          alt={listing.title}
          style={{ width: '100%', height: 200, borderRadius: 5, flexBasis: 1, maxWidth: 300 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: [null, null, 3] }}>
          <Typography
            component='h3'
            sx={{ fontSize: 22, fontWeight: 400, cursor: 'pointer' }}
            onClick={() => {
              const url = `https://www.motorsingh.com/home/detail/${listing.id}`
              window.open(url, '_blank', 'noreferrer')
            }}
          >
            {listing?.title}
          </Typography>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 500, mt: 2 }}>
            <span style={{ fontWeight: 400 }}>AED </span>
            <span style={{ fontSize: 24 }}> {listing?.price.toLocaleString()}</span>
          </Typography>
          <Box sx={{ display: 'flex', mt: 2, flexDirection: { xs: 'column', lg: 'row' } }}>
            <Box sx={{ display: 'flex', flex: '1 1 0', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
                Location
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                {capFirst(listing?.city)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: '1 1 0', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
                Kilometers
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                {listing?.kms_run}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: '1 1 0', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
                Year
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
      <Divider sx={{ my: 5, mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', lg: 'row' }, ml: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='subtitle2' sx={{ fontSize: 14 }}>
            <span style={{ fontWeight: 400 }}>Posted on</span>{' '}
            <span style={{ fontWeight: 400 }}>{moment(listing?.added_on).toString()}</span>
          </Typography>
          <Divider orientation='vertical' sx={{ mx: 2 }} flexItem />
          <Typography variant='subtitle2' sx={{ fontSize: 14 }}>
            <span style={{ fontWeight: 400 }}>Updated on</span>{' '}
            <span style={{ fontWeight: 400 }}>{moment(listing?.updated_on).toString()}</span>
          </Typography>
        </Box>
        <Button
          variant='outlined'
          onClick={() => {
            const url = `https://www.motorsingh.com/home/detail/${listing.id}`
            window.open(url, '_blank', 'noreferrer')
          }}
        >
          View Detail
        </Button>
      </Box>
    </Paper>
  )
}

export default AdsItem
