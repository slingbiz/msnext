import { useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { getMyLeadListingsAction } from '../../redux/actions/myAccount.js'
import {
  Card,
  CardHeader,
  Grid,
  Paper,
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
  Typography
} from '@mui/material'
import { blue, red, yellow } from '@mui/material/colors'

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
    id: 'query',
    label: 'Query'
  },
  {
    id: 'make_model',
    label: 'Make & Model'
  },
  {
    id: 'detail',
    label: 'Car Detail'
  },
  {
    id: 'status',
    label: 'Status'
  }
]

export default function LeadsPage(pageComponentProps) {
  const dispatch = useDispatch()

  const theme = useTheme()
  const { user } = pageComponentProps
  const myLeadListings = useSelector(({ myAccount }) => myAccount.myLeadListings)
  const [filterValue, setFilterValue] = useState('ALL')

  console.log(myLeadListings, 'myLeadsListings [Response]')

  useEffect(() => {
    dispatch(getMyLeadListingsAction({ filterValue }))
  }, [dispatch, filterValue])

  const handleClickAvatar = url => {
    window.open(url, '_blank')
  }

  return (
    <Grid>
      <Card>
        <CardHeader
          title='My Leads'
          subheader={
            <Box sx={{ display: 'flex', alignItems: 'cener', justifyContent: 'space-between' }}>
              <Typography variant='body2'>
                <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Total ({myLeadListings.length})
                </Box>{' '}
                😎 this month
              </Typography>
              <Box sx={{ display: 'flex', mt: { xs: 3, lg: 0 }, alignItems: 'center' }}>
                <Button
                  variant={filterValue === 'ALL' ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: 10,
                    fontWeight: 700,
                    boxShadow: 4,
                    '&:hover': {
                      backgroundColor: theme.palette.grey[300],
                      borderColor: theme.palette.primary.main
                    }
                  }}
                  onClick={() => setFilterValue('ALL')}
                >
                  ALL
                </Button>
                <Button
                  variant={filterValue == 'NEW' ? 'contained' : 'outlined'}
                  sx={{
                    mx: 2,

                    borderRadius: 10,
                    fontWeight: 700,
                    boxShadow: 4,
                    '&:hover': {
                      backgroundColor: theme.palette.grey[300],
                      borderColor: theme.palette.primary.main
                    }
                  }}
                  onClick={() => setFilterValue('NEW')}
                >
                  NEW
                </Button>
                <Button
                  variant={filterValue == 'COMPLETED' ? 'contained' : 'outlined'}
                  sx={{
                    mx: 2,

                    borderRadius: 10,
                    fontWeight: 700,
                    boxShadow: 4,
                    '&:hover': {
                      backgroundColor: theme.palette.grey[300],
                      borderColor: theme.palette.primary.main
                    }
                  }}
                  onClick={() => setFilterValue('COMPLETED')}
                >
                  COMPLETED
                </Button>
                <Button
                  variant={filterValue == 'PROCESSING' ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: 10,
                    fontWeight: 700,
                    boxShadow: 4,
                    '&:hover': {
                      backgroundColor: theme.palette.grey[300],
                      borderColor: theme.palette.primary.main
                    }
                  }}
                  onClick={() => setFilterValue('PROCESSING')}
                >
                  PROCESSING
                </Button>
              </Box>
            </Box>
          }
          titleTypographyProps={{
            sx: {
              mb: 2.5,
              lineHeight: '2rem !important',
              letterSpacing: '0.15px !important'
            }
          }}
        />

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {myLeadListings.map(row => {
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
                              <Box>{row['make']}</Box>
                              <Box>{row['model']}</Box>
                            </TableCell>
                          )
                        }
                        if (column.id === 'status') {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ '.MuiButton-root': { color: 'white' } }}
                            >
                              <Button variant='contained' size='medium' fullWidth={true}>
                                {row[column.id].toUpperCase()}
                              </Button>
                            </TableCell>
                          )
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </Card>
    </Grid>
  )
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx

  const response = await axios.get('https://www.motorsingh.com/user/validate', {
    headers: { cookie: `PHPSESSID=${req.cookies.PHPSESSID};` }
  })

  if (!response?.data?.user_id) {
    // return {
    //   redirect: {
    //     destination: 'https://www.motorsingh.com', statusCode: 302
    //   }
    // };
    return {
      props: {}
    }
  }
  const user = response?.data
  req.user = user

  return {
    props: { user }
  }
}
