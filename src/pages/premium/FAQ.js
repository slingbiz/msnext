import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Container } from '@mui/material'

const FAQ = () => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Container
      sx={{
        minHeight: { xs: '50vh', lg: '70vh' },
        paddingY: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Typography variant='h3' fontWeight={700} align='center' color='text.primary' component='p' my={10}>
        Frequently Asked Questions
      </Typography>

      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{
          '&.MuiAccordion-root': {
            marginBottom: '15px'
          }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
          <Typography variant='h5'>General Question 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1' fontSize='1.25rem'>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim
            quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={{
          '&.MuiAccordion-root': {
            marginBottom: '15px'
          }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2bh-content' id='panel2bh-header'>
          <Typography variant='h5'>General Question 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1' fontSize='1.25rem'>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit.
            Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        sx={{
          '&.MuiAccordion-root': {
            marginBottom: '15px'
          }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel3bh-content' id='panel3bh-header'>
          <Typography variant='h5'>General Question 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1' fontSize='1.25rem'>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas
            augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        sx={{
          '&.MuiAccordion-root': {
            marginBottom: '15px'
          }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel4bh-content' id='panel4bh-header'>
          <Typography variant='h5'>General Question 4</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1' fontSize='1.25rem'>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas
            augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}

export default FAQ
