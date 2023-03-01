import React, { useState } from 'react'
import {
  Container,
  Box,
  Card,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { useRef } from 'react'

const BannerCard = () => {
  const badgets = ['0-2 Lake', '2-3 Lake', '3-5 Lake', '5-8 Lake', '8-10 Lake', '10+ Lake']

  const [radioButton, setRadioButton] = useState('by budget')
  const buttonRef1 = useRef(null)
  const buttonRef2 = useRef(null)

  const handelButton1 = () => {
    buttonRef1.current.style.backgroundColor = '#24272c'
    buttonRef1.current.style.color = '#fff'
    buttonRef2.current.style.backgroundColor = '#fff'
    buttonRef2.current.style.color = '#24272c'
  }

  const handelButton2 = () => {
    buttonRef1.current.style.backgroundColor = '#fff'
    buttonRef1.current.style.color = '#24272c'
    buttonRef2.current.style.backgroundColor = '#24272c'
    buttonRef2.current.style.color = '#fff'
  }

  const handleChange = event => {
    setRadioButton(event.target.value)
  }

  return (
    <div>
      <Container sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <Box>
          <Card sx={{ padding: '20px' }}>
            <Typography variant='h5' color={'black'} padding='10px' fontWeight='bold'>
              Find your right car
            </Typography>

            {/* button */}
            <Box>
              <Button
                ref={buttonRef1}
                onClick={handelButton1}
                sx={{ mr: 3, fontWeight: 'bold' }}
                variant='outlined'
                color='inherit'
              >
                New Car
              </Button>
              <Button
                ref={buttonRef2}
                onClick={handelButton2}
                variant='outlined'
                sx={{ fontWeight: 'bold' }}
                color='inherit'
              >
                Used Car
              </Button>
            </Box>
            <Box marginTop={5}>
              <RadioGroup
                onChange={handleChange}
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                defaultValue='by budget'
                name='row-radio-buttons-group'
              >
                <FormControlLabel value='by budget' control={<Radio />} label='By Budget' />
                <FormControlLabel value='by model' control={<Radio />} label='By Model' />
              </RadioGroup>
            </Box>

            <Box marginTop={5}>
              {radioButton === 'by budget' ? (
                <FormControl fullWidth s>
                  <InputLabel id='demo-simple-select-label'>Select Budget</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    // value={age}

                    label='Select Budget'
                    // onChange={handleChange}
                  >
                    {badgets.map((budget, k) => (
                      // eslint-disable-next-line react/jsx-key
                      <MenuItem key={k} value={budget}>
                        {budget}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth s>
                  <InputLabel id='demo-simple-select-label'>Select Model</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    // value={age}

                    label='Select Model'
                    // onChange={handleChange}
                  >
                    {badgets.map((budget, k) => (
                      // eslint-disable-next-line react/jsx-key
                      <MenuItem key={k} value={budget}>
                        {budget}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <FormControl fullWidth s>
                <InputLabel id='demo-simple-select-label'>Select City</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  // value={age}

                  label='Select City'
                  // onChange={handleChange}
                >
                  {badgets.map((budget, k) => (
                    // eslint-disable-next-line react/jsx-key
                    <MenuItem key={k} value={budget}>
                      {budget}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box marginTop={5}>
              <Button sx={{ backgroundColor: '#F75D34', fontWeight: 'bold' }} variant='contained' fullWidth>
                Contained
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  )
}

export default BannerCard
