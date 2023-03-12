import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateStatusAction } from 'src/redux/actions/myAccount'
import { Button, MenuItem, Select } from '@mui/material'

const options = [
  { value: 'NEW', label: 'NEW' },
  { value: 'COMPLETED', label: 'COMPLETED' },
  { value: 'PROCESSING', label: 'PROCESSING' }
]

const SelectButton = ({ defaultValue, id = null, table = 'rfq' }) => {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => {
    if (defaultValue != null) {
      setSelectedOption(defaultValue)
    }
  }, [defaultValue])

  const handleChange = event => {
    setSelectedOption(event.target.value)

    dispatch(updateStatusAction({ t: table, id, status: event.target.value }))
  }

  return (
    <>
      <Button variant='contained' size='medium' fullWidth={true} sx={{ textTransform: 'none' }}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            cursor: 'pointer',
            '&:focus': {
              backgroundColor: 'transparent'
            }
          }}
          displayEmpty
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {selectedOption || 'Update status'}
      </Button>
    </>
  )
}

export default SelectButton
