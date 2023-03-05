// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// ** switcher
import Switch from '@mui/material/Switch';

// ** checkbox
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// ** Third Party Styles Imports
import { useDispatch, useSelector } from 'react-redux'

// ** select box
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { textAlign } from '@mui/system';
import { right } from '@popperjs/core';
import StepperBar from 'src/layouts/components/stepper-bar';



const label = { inputProps: { 'aria-label': 'Switch demo' } };
const SellCar = props => {

  // ** State
  const [value, setValue] = useState('account')

  const dispatch = useDispatch()
  const { user } = props
  const userId = user?.user_id
  const loggedUser = useSelector(({ myAccount }) => myAccount.singleUser)


  return (
    <>
      <Card sx={{ padding: 8, mb: 5 }}>
        <Box component="form" sx={{ display: 'flex', mb: 0 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 25, width: '50%', pt: 0, textAlign: 'left', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Sell Your Car in UAE</b>
          </Typography>
          <Typography sx={{ fontSize: 17, width: '50%', pt: 0, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            Package Selected: <Button variant="text">BASIC</Button>
          </Typography>
        </Box>


        <Box component="form" sx={{ display: 'flex', mb: 8}}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 18, width: '50%', pt: 2, textAlign: 'left', pr: 5 }} color="text.secondary" gutterBottom>
            Post an ad in just 4 simple steps
          </Typography>
          <Typography sx={{ fontSize: 17, width: '50%', pt: 0, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <Button variant="contained">Upgrade</Button>
          </Typography>
        </Box>
        <StepperBar/>
      </Card>

      

      <Card sx={{ padding: 8 }}>
        <Typography sx={{ fontSize: 22, mb: 5 }} color="text.secondary" gutterBottom>
          <b>Enter your Car Information</b>
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>What is the brand of your car?</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>What is the brand and model of your car?</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>What is the model of your car?</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>What is the brand and model of your car?</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>What is the model year of your car?</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>What is the brand and model of your car?</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>What color is your car?</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>What is the brand and model of your car?</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Exterior Color</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>What color is your car?</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Car Condition</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>What is the condition of your car?</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>City</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>Which city is your car located in?</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Area</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>Which area is your car located in?</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 4 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Price in UAE (AED)</b>
          </Typography>
          <TextField error id="outlined-basic" sx={{ width: '50%' }} label="What is your asking price for the car?" variant="outlined" helperText="Incorrect entry." />
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 4 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Kilometers Driven</b>
          </Typography>
          <TextField error id="outlined-basic" sx={{ width: '50%' }} label="How many kilometers is your car driven?" variant="outlined" helperText="Incorrect entry." />
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 4 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Warranty Date</b>
          </Typography>
          <TextField error id="outlined-basic" sx={{ width: '50%' }} label="dd-mm-yyyy" variant="outlined" helperText="Incorrect entry." />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Regional Specs</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>Select the specs of your car</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b> Accident History</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>Select the accident history of your car</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 0 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 4, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Additional Comments</b>
          </Typography>
          <TextField sx={{ mb: 2, mt: 3, width: '50%' }}
            id="outlined-multiline-static"
            label="Comments"
            multiline
            rows={4}
            placeholder="Describe your car's condition and mention its additional details such as after market modifications, service history, ownership history, etc."
            defaultValue=""
          />
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 4 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 4, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b></b>
          </Typography>
          <Typography sx={{ fontSize: 15, width: '50%', textAlign: 'left', pr: 5 }} color="text.secondary" gutterBottom>
            <small>You can also use the following suggestions</small><br></br>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Full Option</Button>
            <Button variant="contained" sx={{ mr: 2, mt: 2 }}>Accident Free</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Single Owner</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Third Owner</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Expat Owner</Button>
          </Typography>
        </Box>
        <Box component="form" sx={{ display: 'flex', justifyContent: 'right', mb: 4, mt: 10 }}
          noValidate autoComplete="off">
          <Button variant="contained">Available in SUPER and HYPER</Button>
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 0 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 2, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Badges</b>
          </Typography>
          <Typography>
            <FormGroup sx={{ mt: 0 }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Urgent" />
            </FormGroup>
            <FormGroup sx={{ mt: 0 }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Perfect inside and out" />
            </FormGroup>
            <FormGroup sx={{ mt: 0 }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="No accident history" />
            </FormGroup>
            <FormGroup sx={{ mt: 0 }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Low mileage" />
            </FormGroup>
            <FormGroup sx={{ mt: 0 }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Full service history available" />
            </FormGroup>
            <FormGroup sx={{ mt: 0 }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Under warranty until mm/dd/yyy" />
            </FormGroup>
          </Typography>
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 0 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 4, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Hide Price History</b>
          </Typography>
          <Switch sx={{ mt: 3 }} {...label} defaultChecked />
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 0 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 4, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Hide Last Updated Date</b>
          </Typography>
          <Switch sx={{ mt: 2 }} {...label} defaultChecked />
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 4, mt: 4 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Your Mobile Number</b>
          </Typography>
          <TextField error id="outlined-basic" sx={{ width: '50%' }} label="e.g. 0512345678" variant="outlined" helperText="Incorrect entry." />
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 0 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 4, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Hide Last Updated Date</b>
          </Typography>
          <Switch sx={{ mt: 2 }} {...label} defaultChecked />
        </Box>
        <Box component="form" sx={{ display: 'flex', justifyContent: 'right', mb: 4, mt: 10 }}
          noValidate autoComplete="off">
          <Button variant="contained">Available in SUPER and HYPER</Button>
        </Box>
      </Card>


      <Card sx={{ padding: 8, mt: 5 }}>
        <Typography sx={{ fontSize: 22, mb: 5 }} color="text.secondary" gutterBottom>
          <b>Additional Information</b>
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Body Style</b>
          </Typography>
          <FormControl sx={{ mb: 5, mt: 3, width: '50%' }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none">
                <em>What is the body style of your car?</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 5, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Number of Doors</b>
          </Typography>
          <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>1</Button>
          <Button variant="contained" sx={{ mr: 2, mt: 2 }}>2</Button>
          <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>3</Button>
          <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>4</Button>
        </Box>

        <Box sx={{ display: 'flex', mt: 3 }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 5, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Fuel Type</b>
          </Typography>
          <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Petrol</Button>
          <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Diesel</Button>
          <Button variant="contained" sx={{ mr: 2, mt: 2 }}>Hybrid</Button>
          <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Electric</Button>
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 4, mt: 6 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 6, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Engine CC</b>
          </Typography>
          <TextField id="outlined-basic" sx={{ width: '50%' }} label="What is the Engine CC of your car?" variant="outlined" />
        </Box>

        <Box sx={{ display: 'flex', mt: 3 }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 5, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Fuel Type</b>
          </Typography>
          <Typography sx={{ width: '50%' }}>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>3</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>4</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>5</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>6</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>8</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>10</Button>
            <Button variant="contained" sx={{ mr: 2, mt: 2 }}>12</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>16</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>N/A, Electric</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Not Sure</Button>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', mt: 3 }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 5, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Transmission</b>
          </Typography>
          <Typography sx={{ width: '50%' }}>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Automatic</Button>
            <Button variant="contained" sx={{ mr: 2, mt: 2 }}>Manual</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>CVT</Button>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', mt: 3 }}>
          <Typography sx={{ fontSize: 15, width: '30%', pt: 5, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Drive Type</b>
          </Typography>
          <Typography sx={{ width: '50%' }}>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>Rear Wheel Drive</Button>
            <Button variant="contained" sx={{ mr: 2, mt: 2 }}>Front Wheel Drive</Button>
            <Button variant="outlined" sx={{ mr: 2, mt: 2 }}>All Wheel Drive</Button>
          </Typography>
        </Box>

        <Box component="form" sx={{ display: 'flex', mb: 4, mt: 6 }}
          noValidate autoComplete="off">
          <Typography sx={{ fontSize: 15, width: '30%', pt: 4, textAlign: 'right', pr: 5 }} color="text.secondary" gutterBottom>
            <b>Features</b>
          </Typography>
          <TextField error id="outlined-basic" sx={{ width: '50%' }} label="Add car features..." variant="outlined" helperText="Incorrect entry." />
        </Box>

        <Box component="form" sx={{ display: 'flex', justifyContent: 'right', mb: 4, mt: 10 }}
          noValidate autoComplete="off">
          <Button variant="outlined" sx={{ mr: 2, mt: 0 }}>Back</Button>
          <Button variant="contained">Continue</Button>
        </Box>

      </Card>

    </>




  )
}


export default SellCar
