import React, { useEffect } from 'react'
import { useSockets } from 'src/@core/context/socket.context'
import { Avatar, Box, Divider, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'

const ChatList = ({ chats, setChats, userId, setRecepient, setOpenChat, setOpenMenu, isMobile }) => {
  const { socket, messages, conUsers, setMessages } = useSockets()

  return (
    <List
      sx={{
        height: '70vh',
        overflow: 'auto',
        '& ul': { padding: 0 }
      }}
    >
      {chats.map((chat, index) => {
        const loggedUser = Number(userId)
        const cUser = Number(chat.user_id)
        const cCar = Number(chat.id)

        const uChat = messages.filter(msg => {
          const mSender = Number(msg.sender)
          const mReceiver = Number(msg.receiver)
          const mCar = Number(msg.car)

          if (
            mCar === cCar &&
            ((mSender === loggedUser && mReceiver === cUser) || (mSender === cUser && mReceiver === loggedUser))
          ) {
            return msg
          }
        })

        return (
          <>
            <ListItemButton
              key={index}
              alignItems='flex-start'
              onClick={() => {
                setRecepient({
                  id: chat.user_id,
                  name: chat.user_name,
                  carID: chat.id,
                  carTitle: chat.title,
                  kms_run: chat.kms_run,
                  price: chat.price
                })
                setOpenChat(true)
                isMobile ? setOpenMenu(false) : null
              }}
            >
              <ListItemAvatar>
                <Avatar alt={chat.user_name} src='https://mui.com/static/images/avatar/1.jpg' />
              </ListItemAvatar>

              <ListItemText
                primary={<Typography variant='h6'>{chat.user_name.toUpperCase()}</Typography>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='p'
                      variant='body1'
                      color='text.primary'
                      whiteSpace='nowrap'
                      width='100%'
                      overflow='hidden'
                      textOverflow='ellipsis'
                    >
                      on {chat.title}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography whiteSpace='nowrap' width='100%' overflow='hidden' textOverflow='ellipsis'>
                        {uChat?.length > 0 ? `- ${uChat[uChat.length - 1]?.message}` : ''}
                      </Typography>
                      {/* <Badge badgeContent='' color='primary'></Badge> */}
                    </Box>
                  </React.Fragment>
                }
              />
            </ListItemButton>
            <Divider />
          </>
        )
      })}
    </List>
  )
}

export default ChatList
