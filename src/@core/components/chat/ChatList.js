import React, { useState } from 'react'
import { useSockets } from 'src/@core/context/socket.context'
import {
  Avatar,
  Badge,
  Box,
  capitalize,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { capFirst } from '../../../helpers/common'

const ChatList = ({
  chats,
  setChats,
  userId,
  setRecepient,
  setOpenChat,
  selectedChat,
  setSelectedChat,
  setOpenMenu,
  isMobile
}) => {
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
        console.log(selectedChat.id, chat.user_id, 'chat.user_idchat.user_id')

        return (
          <>
            <ListItemButton
              key={index}
              alignItems='flex-start'
              onClick={() => {
                setSelectedChat({ id: chat.user_id, carId: chat.id })
                setRecepient({
                  id: chat.user_id,
                  name: chat.user_name,
                  carID: chat.id,
                  carTitle: chat.title,
                  kms_run: chat.kms_run,
                  price: chat.price,
                  image: chat.img_src
                })
                setOpenChat(true)
                isMobile ? setOpenMenu(false) : null
              }}
              sx={{
                backgroundColor:
                  selectedChat.id === chat.user_id && selectedChat.carId === chat.id
                    ? 'rgba(0, 0, 0, 0.06)'
                    : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                },
                paddingTop: '15px',
                paddingBottom: '15px'
              }}
            >
              <ListItemAvatar>
                <Avatar alt={chat.user_name} src={chat.img_src} />
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>{capFirst(chat.user_name)}</Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ fontSize: '1rem' }}
                      color='text.primary'
                      whiteSpace='nowrap'
                      width='100%'
                      overflow='hidden'
                      textOverflow='ellipsis'
                    >
                      <span style={{ fontSize: '0.875rem', fontWeight: '400' }}>on </span>
                      <span style={{ fontSize: '1rem', fontWeight: '400' }}>{chat.title} </span>
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
                      {uChat?.length > 0 ? <Badge badgeContent={uChat.length} color='primary'></Badge> : ''}
                    </Box>
                  </React.Fragment>
                }
              />
            </ListItemButton>
            <Divider style={{ margin: 0 }} />
          </>
        )
      })}
    </List>
  )
}

export default ChatList
