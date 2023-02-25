import { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import EVENTS from 'src/constants/events'
import { SOCKET_URL } from '../../constants/common'

const socket = io(SOCKET_URL)

const SocketContext = createContext({ socket, conUsers: [], messages: [], notif: [] })

function SocketsProvider(props) {
  const [conUsers, setConUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [notif, setNotif] = useState([])

  const loggedUser = useSelector(({ myAccount }) => myAccount.singleUser)

  useEffect(() => {
    if (loggedUser.length > 0) {
      const userId = loggedUser[0].user_id
      socket.emit(EVENTS.CLIENT.REGISTER, userId)
    }
  }, [loggedUser])

  socket.on(EVENTS.SERVER.NOTIFY, data => {
    const { message, receiver } = data
    const truncMsg = `${message.slice(0, 5)}...`

    setNotif([...notif, { truncMsg, receiver }])
  })

  socket.on(EVENTS.SERVER.USERS, users => {
    setConUsers(users)
  })

  socket.on(EVENTS.CLIENT.PRIVATE_CHAT, data => {
    const { sender, message, car, receiver } = data

    setMessages([...messages, { sender, message, car, receiver }])
  })

  socket.on(EVENTS.SERVER.ERROR, e => {
    console.log(e.error)
  })

  socket.onAny((event, ...args) => {
    console.log('Event called: ', event, args)
  })

  return <SocketContext.Provider value={{ socket, messages, setMessages, conUsers, notif, setNotif }} {...props} />
}

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider
