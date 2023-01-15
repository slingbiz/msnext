import Paper from '@mui/material/Paper'
import React from 'react'
import Image from 'next/image'
import { Box, Button, Typography, Divider } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PhoneIcon from '@mui/icons-material/Phone'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

function AdsItem() {
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
          <Typography component='h3' sx={{ fontSize: 25, fontWeight: 500, color: 'black' }}>
            Used Nizzan siera
          </Typography>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 500, color: 'black', mt: 2 }}>
            AED<span style={{ fontSize: 25, textDecoration: 'underline' }}>12345</span>
          </Typography>
          <Box sx={{ display: 'flex', mt: 2, flexDirection: { xs: 'column', lg: 'row' } }}>
            <Box sx={{ display: 'flex', flex: '1 1 0', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
                Location :
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 700, color: 'black' }}>
                Ajmal
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: '1 1 0', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
                Kilometers :
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 700, color: 'black' }}>
                5451858
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: '1 1 0', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
                Year :
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 700, color: 'black' }}>
                2023
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
            Posted on <span style={{ color: 'black', fontWeight: 600 }}>Dec 21, 2022</span>
          </Typography>
          <Divider orientation='vertical' sx={{ mx: 2 }} flexItem />
          <Typography variant='subtitle2' sx={{ fontSize: 15 }}>
            Updated on <span style={{ color: 'black', fontWeight: 600 }}>Dec 21, 2022</span>
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
