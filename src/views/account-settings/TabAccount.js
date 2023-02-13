// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Packages Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { InputAdornment, OutlinedInput } from '@mui/material'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  currentPassword: yup.string(),
  newPassword: yup.string(),
  confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match')
})

const TabAccount = ({ user }) => {
  const [values, setValues] = useState({
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })
  const [dbUsers, setDbUsers] = useState([])
  useEffect(() => {
    // get all users
    axios.get(`${process.env.Dev_URL}/users`).then(res => {
      setDbUsers(res.data)
    })
  }, [])

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      newPassword: '',
      currentPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values, 'values')

      const loggedUser = dbUsers.filter(dbUser => dbUser.user_email == user.email)

      axios
        .patch(`${process.env.Dev_URL}/users/${loggedUser[0].user_id}`, values)
        .then(res => {
          console.log(res, 'response')
          formik.resetForm()
        })
        .catch(e => console.log(e.message, 'error'))
    }
  })

  return (
    <CardContent>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Name'
              placeholder='John Doe'
              id='name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='email'
              placeholder='johnDoe@example.com'
              id='email'
              name='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 4.75 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor='currentPassword'>Current Password</InputLabel>
              <OutlinedInput
                label='Current Password'
                value={values.currentPassword}
                id='currentPassword'
                type={values.showCurrentPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      aria-label='toggle password visibility'
                      onClick={handleClickShowCurrentPassword}
                    >
                      {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 6 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor='newPassword'>New Password</InputLabel>
              <OutlinedInput
                label='New Password'
                value={values.newPassword}
                id='newPassword'
                onChange={formik.handleChange}
                type={values.showNewPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowNewPassword} aria-label='toggle password visibility'>
                      {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='confirmNewPassword'>Confirm New Password</InputLabel>
              <OutlinedInput
                label='Confirm New Password'
                value={values.confirmNewPassword}
                id='confirmNewPassword'
                type={values.showConfirmNewPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      aria-label='toggle password visibility'
                      onClick={handleClickShowConfirmNewPassword}
                    >
                      {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={formik.resetForm}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
