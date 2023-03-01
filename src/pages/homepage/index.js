import { Style } from '@mui/icons-material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Item'

const index = () => {
  var items = [
    {
      name: 'banner1'
    },
    {
      name: 'banner2'
    },
    {
      name: 'banner3'
    },
    {
      name: 'banner4'
    }
  ]

  const anArrayOfNumbers = ['agsfg', 'hsadhgsa', 'sahgfdas', 'shdjhsg']

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  )
}

export default index
