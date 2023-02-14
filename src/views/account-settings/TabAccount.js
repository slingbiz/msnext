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

// ** Packages Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getSingleUserAction, updateUserAction } from 'src/redux/actions/myAccount'
import { useDispatch, useSelector } from 'react-redux'

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
  phone: yup.number('Enter your phone number').required('Phone number is required'),
  country: yup.string('Enter your country name').required('Country is required')
})

const TabAccount = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const refUser = useSelector(({ myAccount }) => myAccount.singleUser)

  const userId = loggedUser?.user_id

  useEffect(() => {
    dispatch(getSingleUserAction({ userId }))
  }, [userId, dispatch])

  const formik = useFormik({
    initialValues: {
      name: refUser[0]?.user_name || '',
      email: refUser[0]?.user_email || '',
      phone: refUser[0]?.user_mobile || '',
      country: refUser[0]?.country || ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(
        updateUserAction({
          id: userId,
          values: {
            ...values,
            newPassword: '',
            currentPassword: '',
            confirmNewPassword: ''
          }
        })
      )
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='number'
              placeholder='+1 (123) 456-789'
              id='phone'
              name='phone'
              label='Phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='country'
              placeholder='Country'
              id='country'
              name='country'
              label='Country'
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
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
