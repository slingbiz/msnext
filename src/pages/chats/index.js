// ** React Imports
import React, { useEffect, useState } from 'react'
import axios from 'axios'
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

import { Search, MoreVert, Menu as MenuIcon } from '@mui/icons-material'
import useWindowDimensions from 'src/@core/hooks/useWindowDimensions'
import Chat from './Chat'
import { useSockets } from 'src/@core/context/socket.context'
import { SERVICE_URL } from 'src/constants/common'
import EVENTS from 'src/constants/events'

const Chats = props => {
  const { socket, conUsers, messages, notif, setNotif } = useSockets()
  const { width } = useWindowDimensions()

  const [search, setSearch] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const [recepientID, setRecepientID] = useState('')

  const dispatch = useDispatch()
  const { user } = props
  const userId = user?.user_id
  const loggedUser = useSelector(({ myAccount }) => myAccount.singleUser)

  useEffect(() => {
    if (userId) {
      dispatch(getSingleUserAction({ userId }))
    }
  }, [dispatch, userId])

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

  const handleCreateRoom = () => {
    const username = 'ANKUR'
    socket.emit(EVENTS.CLIENT.FAKE_USER, username)
  }

  return (
    <>
      {!conUsers.includes('ANKUR') ? (
        <Button variant='outlined' onClick={handleCreateRoom} sx={{ marginBottom: '10px' }}>
          Chat with Ankur
        </Button>
      ) : (
        ''
      )}
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
              <Grid item xs={12} p={2}>
                <Stack direction='row' spacing={1}>
                  <Chip label='All' onClick={() => {}} />
                  <Chip label='Unread' variant='outlined' onClick={() => {}} />
                </Stack>
              </Grid>
            </React.Fragment>
            <List
              sx={{
                height: '70vh',
                overflow: 'auto',
                '& ul': { padding: 0 }
              }}
            >
              {conUsers
                .filter(conUser => conUser !== 'ADMIN')
                .map((conUser, i) => {
                  const uChat = messages.filter(
                    msg =>
                      (msg.sender === 'ADMIN' && msg.receiver === conUser) ||
                      (msg.sender === conUser && msg.receiver === 'ADMIN')
                  )

                  return (
                    <ListItemButton
                      key={i}
                      alignItems='flex-start'
                      onClick={() => {
                        setRecepientID(conUser)
                        setOpenChat(true)
                        isMobile ? setOpenMenu(false) : null
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt='User name' src='https://material-ui.com/static/images/avatar/1.jpg' />
                      </ListItemAvatar>
                      <ListItemText
                        primary={conUser}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component='span'
                              variant='body2'
                              color='text.primary'
                            >
                              on Hyundai good condition car
                            </Typography>

                            <Box
                              key={i}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            >
                              <Typography
                                style={{
                                  whiteSpace: 'nowrap',
                                  width: '100%',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {uChat.length > 0 ? `- ${uChat[uChat.length - 1]?.message}` : ''}
                              </Typography>
                              {/* <Badge badgeContent='' color='primary'></Badge> */}
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  )
                })}
            </List>
          </Box>
        )}

        <Box component='div' flexGrow={1} borderRight='1px solid #e0e0e0'>
          {openChat ? (
            <Chat recepient={recepientID} setOpenChat={setOpenChat} />
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
      </Card>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx

  const response = await axios.get('https://www.motorsingh.com/user/validate', {
    headers: { cookie: `PHPSESSID=${req.headers.cookies.PHPSESSID}` }

    // headers: { cookie: `PHPSESSID=mfs3u489nlha7t4fb0cqe0b5g5` }
  })

  if (!response?.data?.user_id) {
    return {
      props: {}
    }
  }
  const user = response?.data
  req.user = user

  return {
    props: { user }
  }
}

export default Chats
