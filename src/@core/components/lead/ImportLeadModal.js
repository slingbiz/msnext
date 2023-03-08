import React, { useState } from 'react'
import { Card, CardContent, Divider, Modal, Typography } from '@mui/material'
import FileUpload from './FileUpload'
import PreviewFile from './PreviewFile'
import { addLeads } from 'src/services/myAccount'

const ImportLeadModal = ({ open, setOpen, handleClose }) => {
  const [file, setFile] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', file)

    addLeads(formData).then(() => setOpen(false))
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          p: 4
        }}
      >
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Import Leads
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            For better performance, Please keep number of rows less than 60k
          </Typography>
          <Divider sx={{ my: 2 }} />

          <FileUpload setFile={setFile} handleSubmit={handleSubmit} />

          <PreviewFile file={file} />
        </CardContent>
      </Card>
    </Modal>
  )
}

export default ImportLeadModal
