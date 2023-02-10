import { useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
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
  Button
} from '@mui/material'

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

  console.log(myLeadListings, 'myLeadsListings [Response]')

  useEffect(() => {
    dispatch(getMyLeadListingsAction({}))
  }, [dispatch])

  const handleClickAvatar = url => {
    window.open(url, '_blank')
  }

  return (
    <Grid>
      <Card>
        <CardHeader title='My Leads' titleTypographyProps={{ variant: 'h6' }} />
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
                                alt='John Doe'
                                onClick={() => handleClickAvatar(row.urlSrc)}
                                sx={{ width: 40, height: 40, cursor: 'pointer' }}
                                src='/images/avatars/1.png'
                              />
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
                              <Button variant='contained' size='medium'>
                                Status
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
