import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { getCitiesAction, getModelsAction, getMyLeadListingsAction } from 'src/redux/actions/myAccount'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
  Button,
  Box,
  Typography,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete
} from '@mui/material'
import { capFirst } from 'src/helpers/common.js'
import InputDate from 'src/@core/layouts/components/InputDate'
import ImportLeadModal from 'src/@core/components/lead/ImportLeadModal'
import DefaultLoader from 'src/@core/components/loader/default'

const columns = [
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'email',
    label: 'Email'
  },
  {
    id: 'contact_no',
    label: 'Mobile'
  },
  {
    id: 'city',
    label: 'City'
  },
  {
    id: 'make_model',
    label: 'Make & Model'
  },
  {
    id: 'detail',
    label: 'Car Detail'
  }
]

const validationSchema = yup.object({
  city: yup.string('Select a city'),
  make: yup.string('Select a make'),
  model: yup.string('Select a model')
})

const Lead = ({ brands, loggedUser }) => {
  const dispatch = useDispatch()

  const theme = useTheme()
  const myLeadListings = useSelector(({ myAccount }) => myAccount.myLeadListings)
  const bModels = useSelector(({ myAccount }) => myAccount.models)

  const [filterValue, setFilterValue] = useState('ALL')
  const [selectedMaker, setSelectedMaker] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModel, setOpenModel] = useState(false)

  const citySuggestions = useSelector(({ myAccount }) => myAccount.cities)

  const handleOpenModel = () => setOpenModel(true)
  const handleCloseModel = () => setOpenModel(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myLeadListings.length) : 0

  useEffect(() => {
    dispatch(getMyLeadListingsAction({ filterValue }))
  }, [dispatch, filterValue, openModel])

  useEffect(() => {
    if (selectedMaker) {
      dispatch(getModelsAction({ brandName: selectedMaker }))
    }

    // Empty the models array on unmount
    return () => {
      dispatch(getModelsAction({ brandName: '' }))
    }
  }, [dispatch, selectedMaker])

  const handleClickAvatar = url => {
    window.open(url, '_blank')
  }

  const formik = useFormik({
    initialValues: {
      city: '',
      make: '',
      model: '',
      startRange: '',
      endRange: ''
    },

    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(getMyLeadListingsAction(values))
    }
  })

  return (
    <>
      <CardHeader
        title='My Leads'
        action={
          loggedUser[0]?.is_admin && (
            <>
              <Button
                variant='contained'
                color='primary'
                size='small'
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
                onClick={handleOpenModel}
              >
                Import Leads
              </Button>
              <ImportLeadModal open={openModel} setOpen={setOpenModel} handleClose={handleCloseModel} />
            </>
          )
        }
        titleTypographyProps={{
          sx: {
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />

      <CardContent sx={{ width: '100%', overflow: 'hidden' }}>
        <>
          <form onSubmit={formik.handleSubmit}>
            <Grid container mt={1} mb={5} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item lg={2} md={4} xs={12}>
                <Autocomplete
                  size='small'
                  id='city'
                  noOptionsText='No city found'
                  options={citySuggestions}
                  getOptionLabel={option => option.name}
                  onChange={(e, value) => {
                    formik.setFieldValue('city', value ? value.name : '')
                  }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label='City'
                      variant='outlined'
                      value={formik.values.city}
                      onChange={e => {
                        formik.handleChange(e)
                        dispatch(getCitiesAction(e.target.value))
                      }}
                    />
                  )}
                  limitTags={7}
                />
              </Grid>
              <Grid item lg={2} md={4} xs={12}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='make-select-label'>Make</InputLabel>
                  <Select
                    label='Make'
                    name='make'
                    value={formik.values.make}
                    id='make-select'
                    labelId='make-select-label'
                    onChange={event => {
                      formik.handleChange(event)
                      setSelectedMaker(event.target.value)
                    }}
                  >
                    {brands.map(data => (
                      <MenuItem key={data.name} value={data.name}>
                        {data.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={2} md={4} xs={12}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='model-select-label'>Model</InputLabel>
                  <Select
                    label='Model'
                    name='model'
                    value={formik.values.model}
                    id='model-select'
                    labelId='model-select-label'
                    onChange={formik.handleChange}
                    disabled={bModels.length === 0}
                  >
                    {bModels.map(model => (
                      <MenuItem key={model.name} value={model.name}>
                        {model.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={2} md={4} xs={12}>
                <InputDate
                  name='startRange'
                  title='From'
                  value={formik.values.startRange}
                  setFieldValue={formik.setFieldValue}
                />
              </Grid>
              <Grid item lg={2} md={4} xs={12}>
                <InputDate
                  name='endRange'
                  title='To'
                  value={formik.values.endRange}
                  setFieldValue={formik.setFieldValue}
                />
              </Grid>

              <Grid item lg={2} md={4} xs={12}>
                <Button
                  type='submit'
                  size='small'
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark
                    }
                  }}
                  variant='contained'
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='body2'>
              <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                Found total ({myLeadListings.length}) leads
              </Box>{' '}
            </Typography>
          </Box>
        </>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F4F5FA' }}>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {myLeadListings.length > 0 ? (
                <>
                  {myLeadListings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                          const value = row[column.id]
                          if (column.id === 'detail') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Avatar
                                  alt={row['make']}
                                  onClick={() => handleClickAvatar(row.urlSrc)}
                                  sx={{ width: 40, height: 40, cursor: 'pointer' }}
                                  src={row['img_src']}
                                />
                              </TableCell>
                            )
                          }
                          if (column.id === 'make_model') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Box>{capFirst(row['make'])}</Box>
                                <Box>{capFirst(row['model'])}</Box>
                              </TableCell>
                            )
                          }
                          if (column.id === 'city') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Box>{capFirst(row['city'])}</Box>
                              </TableCell>
                            )
                          }
                          if (column.id === 'contact_no') {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ '.MuiButton-root': { color: 'white' } }}
                              >
                                <Box>{row['mobile1']}</Box>
                              </TableCell>
                            )
                          }

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : capFirst(value)}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 71 * emptyRows
                      }}
                    >
                      <TableCell colSpan={columns.length} />
                    </TableRow>
                  )}
                  <DefaultLoader />
                </>
              ) : (
                <TableRow>
                  <TableCell align='center' colSpan={columns.length}>
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          count={myLeadListings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </>
  )
}

export default Lead
