import React, { useState } from 'react'
import { Box, Button, Card, Typography } from '@mui/material'
import { ArticleOutlined } from '@mui/icons-material'

const FileUpload = ({ setFile, handleSubmit }) => {
  const [fileName, setFileName] = useState('')

  const uploadHandler = e => {
    const fName = e.target.files[0]?.name?.replace(/\.[^/.]+$/, '')
    setFileName(fName)
    setFile(e.target.files[0])
  }

  return (
    <>
      <Card
        variant='outlined'
        sx={{
          padding: '1rem',
          margin: '1rem 0',
          minWidth: '60vw'
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            mb={2}
            padding={3}
            position='relative'
            width='100%'
            height='10vh'
            borderRadius='6px'
            border='2px solid #c3c3c3'
          >
            {fileName === '' ? (
              <>
                <input
                  type='file'
                  name='file'
                  accept='.csv'
                  onChange={uploadHandler}
                  style={{
                    opacity: 0,
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                  }}
                />
                <Typography
                  variant='body2'
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  Drop files here to upload
                </Typography>
              </>
            ) : (
              <Box
                sx={{
                  width: '5rem',
                  padding: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0px 2px 10px 0px rgb(58 53 65 / 10%)'
                }}
              >
                <ArticleOutlined fontSize='large' />
                <Typography variant='caption'>{fileName}</Typography>
              </Box>
            )}
          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='caption' mb={1}>
              Download Sample <b>Lead Import</b> CSV
            </Typography>
            <Button variant='outlined' size='small' type='submit'>
              Upload
            </Button>
          </Box>
        </form>
      </Card>
    </>
  )
}

export default FileUpload
