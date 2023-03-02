import React, { useEffect, useState } from 'react'
import { FormControl, TextField } from '@mui/material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const InputDate = ({ name, title, value, setFieldValue }) => {
  const handleOnChange = date => {
    setFieldValue(name, date)
  }

  return (
    <FormControl fullWidth size='small'>
      <DatePicker
        name={name}
        id='date-picker'
        selected={value}
        onChange={handleOnChange}
        customInput={<TextField fullWidth size='small' variant='outlined' label={title} />}
      />
    </FormControl>
  )
}

export default InputDate
