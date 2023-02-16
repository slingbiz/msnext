// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Package Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { updateUserAction } from 'src/redux/actions/myAccount'
import { useDispatch } from 'react-redux'

const validationSchema = yup.object({
  currentPassword: yup.string().required('Old password is required'),
  newPassword: yup.string().required('New Password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirmed Password is required')
})

const TabSecurity = ({ loggedUser }) => {
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const userId = loggedUser?.user_id

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      currentPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(
        updateUserAction({
          id: userId,
          values: {
            ...values,
            name: '',
            email: '',
            phone: '',
            country: ''
          }
        })
      )

      formik.resetForm()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='currentPassword'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='currentPassword'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
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
                  {formik.touched.currentPassword && Boolean(formik.errors.currentPassword) && (
                    <small style={{ color: 'red' }}>{formik.errors.currentPassword}</small>
                  )}
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
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formik.touched.newPassword && Boolean(formik.errors.newPassword) && (
                    <small style={{ color: 'red' }}>{formik.errors.newPassword}</small>
                  )}
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
                    error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                    helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
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
                  {formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword) && (
                    <small style={{ color: 'red' }}>{formik.errors.confirmNewPassword}</small>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box sx={{ mt: 1.75, display: 'flex', alignItems: 'center' }}>
          <KeyOutline sx={{ marginRight: 3 }} />
          <Typography variant='h6'>Two-factor authentication</Typography>
        </Box>

        <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 368,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Avatar
              variant='rounded'
              sx={{ width: 48, height: 48, color: 'common.white', backgroundColor: 'primary.main' }}
            >
              <LockOpenOutline sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Typography sx={{ fontWeight: 600, marginTop: 3.5, marginBottom: 3.5 }}>
              Two factor authentication is not enabled yet.
            </Typography>
            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in. Learn more.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 11 }}>
          <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }}>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}

export default TabSecurity
