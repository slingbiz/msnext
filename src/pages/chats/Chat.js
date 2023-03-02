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
import { getAllChatOfUserAction } from 'src/redux/actions/chat'

const validationSchema = yup.object({
  message: yup.string().required()
})

const Chat = props => {
  const { recepient = {}, setOpenChat, userId } = props
  const dispatch = useDispatch()
  const { socket, messages, conUsers, setMessages } = useSockets()
  const [opened, setOpened] = useState(false)

  const { id: recepientID, name: recepientName, carID, carTitle, kms_run, price } = recepient
  const loggedUser = Number(userId)
  const dbMessages = useSelector(({ chat }) => chat.allChatOfUser)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const MessagesAfterCurrentRemoved = messages.filter(msg => {
      const mCar = Number(msg.car)
      const mSender = Number(msg.sender)
      const mReceiver = Number(msg.receiver)
      if (
        mCar === carID &&
        ((mSender === loggedUser && mReceiver === recepientID) || (mSender === recepientID && mReceiver === loggedUser))
      ) {
        return false
      } else {
        return true
      }
    })

    // Remove the messages on mounting of chat to avoid duplication
    setMessages(MessagesAfterCurrentRemoved)

    return () => {
      // Remove the message from socket messages on unmounting
      setMessages(MessagesAfterCurrentRemoved)
    }
  }, [])

  useEffect(() => {
    if (recepientID) {
      // Get all messages of sender and receiver
      const values = { sender: userId, receiver: recepientID, car: carID }
      dispatch(getAllChatOfUserAction(values))
    }
  }, [recepientID])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'nearest' })
  }, [setOpenChat, dbMessages])

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      if (values) {
        socket.emit(EVENTS.CLIENT.PRIVATE_CHAT, {
          to: Number(recepientID),
          message: values.message,
          car: Number(carID),
          from: Number(userId)
        })

        // save current message in messages state
        setMessages([
          ...messages,
          {
            sender: Number(userId),
            message: values.message,
            car: Number(carID),
            receiver: Number(recepientID)
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
          <Box component='div' display='flex' alignItems='center'>
            <Avatar alt='image' src='https://mui.com/static/images/avatar/1.jpg' />
            <Typography variant='h6' textTransform='uppercase' paddingLeft={3}>
              {recepientName}
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
            <Grid container spacing={1} alignItems='center'>
              <Grid item sm={6}>
                <Typography variant='body1'>{carTitle}</Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography variant='body1'>{`₹ ${price}`}</Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography variant='body1'>{`${kms_run} km`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2} align='right'>
            <Button href='#' variant='contained'>
              View
            </Button>
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
              flexDirection={from_user === recepientID ? 'row' : 'row-reverse'}
            >
              <Typography variant='p' p={3} borderRadius={2} bgcolor='#e3e3e3'>
                {message}
              </Typography>
            </Box>
          )
        })}

        {messages
          .filter(msg => {
            const mSender = Number(msg.sender)
            const mReceiver = Number(msg.receiver)
            const mCar = Number(msg.car)

            if (
              mCar === carID &&
              ((mSender === loggedUser && mReceiver === recepientID) ||
                (mSender === recepientID && mReceiver === loggedUser))
            ) {
              return msg
            }
          })
          .map((msg, i) => {
            const { sender, message, car, receiver } = msg

            return (
              <Box
                key={i}
                component='div'
                p={2}
                display='flex'
                alignItems='center'
                flexDirection={sender === loggedUser ? 'row-reverse' : 'row'}
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
