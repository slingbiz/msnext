// ** React Imports
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserAction } from 'src/redux/actions/myAccount'

// ** MUI Imports
import { Avatar, Box, Button, Fab, Grid, IconButton, TextField, Typography } from '@mui/material'

import { Send, Search, MoreVert, Close, Menu as MenuIcon } from '@mui/icons-material'
import { useFormik } from 'formik'
import { SERVICE_URL } from 'src/constants/common'
import { useSockets } from 'src/@core/context/socket.context'
import EVENTS from 'src/constants/events'

const validationSchema = yup.object({
  message: yup.string().required()
})

const Chat = props => {
  const { socket, messages, conUsers, setMessages } = useSockets()
  const { recepient, setOpenChat } = props

  const [dbMessages, setDbMessages] = useState([])

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'nearest' })
  }, [setOpenChat, dbMessages])

  useEffect(() => {
    // Get all messages of sender and receiver
    const values = { sender: 'ADMIN', receiver: recepient }
    axios.post(`${SERVICE_URL}/chats`, values).then(res => {
      setDbMessages(res.data)
    })

    return () => {}
  }, [recepient])

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      if (values) {
        socket.emit(EVENTS.CLIENT.PRIVATE_CHAT, {
          to: recepient,
          message: values.message,
          from: 'ADMIN'
        })

        // save current message in messages state
        setMessages([
          ...messages,
          {
            sender: 'ADMIN',
            message: values.message,
            receiver: recepient
          }
        ])

        // reset form
        formik.resetForm()
      }
    }
  })

  return (
    <Box display='flex' flexDirection='column' height='100%'>
      <Box component='div' flex='0 1 auto'>
        <Box
          component='div'
          padding={3}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          borderBottom='1px solid rgba(58, 53, 65, 0.12)'
        >
          <Box component='div' display='flex' justifyContent='center' alignItems='center'>
            <Avatar alt='User name' src='https://material-ui.com/static/images/avatar/1.jpg' />
            <Typography variant='h6' sx={{ textTransform: 'uppercase', paddingLeft: '10px' }}>
              {recepient}
            </Typography>
          </Box>
          <Box component='div' p={2} display='flex'>
            <IconButton aria-label='more options'>
              <MoreVert />
            </IconButton>
            <IconButton aria-label='more options' onClick={() => setOpenChat(false)}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Grid container p={3} spacing={1} alignItems='center'>
          <Grid item sm={10}>
            <Grid container spacing={1}>
              <Grid item sm={6}>
                <Typography variant='body1'>Hyundai good condition car</Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography variant='body2'>₹ 2,40,000</Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography variant='body2'>23,999 km</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2} align='right'>
            <Button variant='contained'>View</Button>
          </Grid>
        </Grid>
      </Box>

      <Box
        component='div'
        paddingTop={4}
        paddingBottom={4}
        backgroundColor='#ebeeef'
        flex='1 1 auto'
        sx={{ overflowY: 'scroll' }}
      >
        {dbMessages.map((dM, index) => {
          const { from_user, message } = dM

          return (
            <Box
              key={index}
              component='div'
              p={2}
              display='flex'
              alignItems='center'
              flexDirection={from_user === 'ADMIN' ? 'row-reverse' : 'row'}
            >
              <Typography variant='p' p={3} borderRadius={2} bgcolor='#e3e3e3'>
                {message}
              </Typography>
            </Box>
          )
        })}

        {messages
          .filter(
            msg =>
              (msg.sender === 'ADMIN' && msg.receiver === recepient) ||
              (msg.sender === recepient && msg.receiver === 'ADMIN')
          )
          .map((msg, i) => {
            const { sender, message, receiver } = msg

            return (
              <Box
                key={i}
                component='div'
                p={2}
                display='flex'
                alignItems='center'
                flexDirection={sender === 'ADMIN' ? 'row-reverse' : 'row'}
              >
                <Typography variant='p' p={3} borderRadius={2} bgcolor='#e3e3e3'>
                  {message}
                </Typography>
              </Box>
            )
          })}
        <div ref={messagesEndRef} />
      </Box>

      <Box component='div' flex='0 1 auto'>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            p={2}
            spacing={1}
            alignItems='center'
            marginTop={'0px !important'}
            style={{ borderTop: '1px solid #e3e3e3' }}
          >
            <Grid item xs={10} lg={11}>
              <TextField
                fullWidth
                label='Type something'
                id='message'
                name='message'
                value={formik.values.message}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={2} lg={1} align='right'>
              <Fab type='submit' color='primary' aria-label='add'>
                <Send />
              </Fab>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default Chat
