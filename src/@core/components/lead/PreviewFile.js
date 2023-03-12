import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

const PreviewFile = ({ file }) => {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    if (file) {
      Papa.parse(file, {
        header: true,
        preview: 5,
        complete: function (results) {
          setData(results.data)
          setColumns(results.meta.fields)
        }
      })
    }
  }, [file])

  return (
    <>
      {data && data.length > 0 && (
        <>
          <Typography variant='body2'>Preview (first 5 rows)</Typography>

          <TableContainer sx={{ maxWidth: '80vw', overflow: 'scroll', maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell key={index}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {columns.map((column, index) => (
                      <TableCell key={index}>{row[column]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}

export default PreviewFile
