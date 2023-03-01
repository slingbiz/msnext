import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import React from 'react'
import BannerCard from 'src/@core/components/Banner/Card'
import { useMediaQuery } from '@mui/material'

const Item = ({ item }) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return <div className={item.name}>{!isMobile && <BannerCard />}</div>
}

export default Item
