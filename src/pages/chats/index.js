// ** React Imports
import React, { useEffect, useState } from 'react'
import axiosAuth from 'src/services/apiAuth';

const axios = axiosAuth();
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserAction } from 'src/redux/actions/myAccount'

// ** MUI Imports
import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
  Badge,
  Button
} from '@mui/material'
import parseCookies from '../../utils/parseCookies'

import { Search, MoreVert, Menu as MenuIcon } from '@mui/icons-material'
import useWindowDimensions from 'src/@core/hooks/useWindowDimensions'
import Chat from './Chat'
import { useSockets } from 'src/@core/context/socket.context'
import { SERVICE_URL } from 'src/constants/common'
import EVENTS from 'src/constants/events'
import ChatList from 'src/@core/components/chat/ChatList'
import Head from 'next/head'
import DefaultLoader from '../../@core/components/loader/default'

const Chats = props => {
  const { socket, conUsers, messages, notif, setNotif } = useSockets()
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()
  const { user } = props

  const [search, setSearch] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const [recepient, setRecepient] = useState({})
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState({ id: null })

  const userId = user?.user_id
  const loggedUser = useSelector(({ myAccount }) => myAccount.singleUser)

  const getChatForCars = async userId => {
    const chats = axios.get(`${SERVICE_URL}/users/cars-crawled/${userId}`)

    return chats
  }

  useEffect(() => {
    if (userId) {
      dispatch(getSingleUserAction({ userId }))

      getChatForCars(userId).then(res => {
        setChats(res.data)
      })
    }
  }, [dispatch, userId])

  socket.on(EVENTS.CLIENT.PRIVATE_CHAT, () => {
    getChatForCars(userId).then(res => {
      setChats(res.data)
    })
  })

  useEffect(() => {
    if (width <= 599) {
      setIsMobile(true)
      if (openChat) {
        setOpenMenu(false)
      } else {
        setOpenMenu(true)
      }
    } else {
      setIsMobile(false)
    }
  }, [width])

  return (
    <>
      <Head>
        <title>Chat with Buyers - My Account </title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Card sx={{ height: '80vh', display: 'flex' }}>
        {isMobile && !openMenu ? (
          <Box component='div' p={1} borderRight='1px solid #e0e0e0'>
            <IconButton
              aria-label='menu'
              size='large'
              onClick={() => {
                setOpenMenu(true)
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        ) : (
          <Box
            component='div'
            width={isMobile ? '100%' : '30%'}
            borderRight='1px solid #e0e0e0'
            zIndex={isMobile ? 9 : null}
          >
            <React.Fragment>
              <Box
                component='div'
                p={3}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                borderBottom='1px solid rgba(58, 53, 65, 0.12)'
              >
                <Typography variant='h5' textTransform='uppercase'>
                  Inbox
                </Typography>
                <Box component='div' p={2} display='flex'>
                  <IconButton aria-label='search' onClick={() => setSearch(!search)}>
                    <Search />
                  </IconButton>
                  <IconButton aria-label='more options'>
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>
              {search ? (
                <Grid item xs={12} p={2}>
                  <TextField id='outlined-basic-email' label='Search' color='secondary' variant='outlined' fullWidth />
                </Grid>
              ) : null}
              <Grid item xs={12} p={3}>
                <Stack direction='row' spacing={1}>
                  <Chip label='All' onClick={() => { }} />
                  <Chip label='Unread' variant='outlined' onClick={() => { }} />
                </Stack>
              </Grid>
            </React.Fragment>

            <ChatList
              chats={chats}
              setChats={setChats}
              userId={userId}
              setRecepient={setRecepient}
              setOpenChat={setOpenChat}
              isMobile={isMobile}
              setOpenMenu={setOpenMenu}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          </Box>
        )}

        <Box component='div' flexGrow={1} borderRight='1px solid #e0e0e0'>
          {openChat ? (
            <Chat recepient={recepient} userId={userId} setOpenChat={setOpenChat} setSelectedChat={setSelectedChat} />
          ) : (
            <Card
              sx={{
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ebeeef'
              }}
            >
              <Typography variant='h6'>Click on a chat to view</Typography>
            </Card>
          )}
        </Box>
        <DefaultLoader />
      </Card>
    </>
  )
}

Chats.getInitialProps = async (ctx) => {
  const { req, res } = ctx;
  const cookies = parseCookies(req);

  const response = await axios.get('https://www.motorsingh.com/user/validate')

  if (!response?.data?.user_id) {
    return {
      props: {}
    }
  }
  const user = response?.data
  if (req) {
    req.user = user
  }

  return {
    user
  }
}

export default Chats
