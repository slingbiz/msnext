import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import React from 'react'
import BannerCard from 'src/@core/components/Banner/Card'

const Item = ({ item }) => {
  return (
    <div className={item.name}>
      <BannerCard />
    </div>
  )
}

export default Item
