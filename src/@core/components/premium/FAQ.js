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
      <Typography variant='h4' fontWeight={700} align='center' color='text.primary' component='p' my={10} color={'#e15540'}>
        Frequently Asked Questions
      </Typography>

      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{
          '&.MuiAccordion-root': {
            marginBottom: '15px',
            padding: '20px'
          }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
          <Typography variant='h6'>Can I test drive a car before making a purchase?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1' fontSize='1.2rem'>
            Yes, we encourage all of our customers to test drive any car they are interested in before making a purchase. We believe that it's important to experience the car firsthand and make sure it meets your needs and preferences.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={{
          '&.MuiAccordion-root': {
            marginBottom: '15px', padding: '20px'
          }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2bh-content' id='panel2bh-header'>
          <Typography variant='h6'>Do you offer any warranties or guarantees on your used cars?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1' fontSize='1.2rem'>
            Yes, we offer a range of warranties and guarantees on our used cars to provide our customers with added peace of mind. Please ask us about the specific warranty options available for the car you are interested in.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        sx={{
          '&.MuiAccordion-root': {
            marginBottom: '15px', padding: '20px'
          }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel3bh-content' id='panel3bh-header'>
          <Typography variant='h6'>Can I trade in my current car towards the purchase of a used car from your dealership?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1' fontSize='1.2rem'>
            Yes, we offer trade-in options for our customers. We can provide you with a competitive trade-in offer for your current car, which you can use towards the purchase of a used car from our dealership.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        sx={{
          '&.MuiAccordion-root': {
            marginBottom: '15px', padding: '20px'
          }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel4bh-content' id='panel4bh-header'>
          <Typography variant='h6'>What is the process for buying a used car from your dealership?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1' fontSize='1.2rem'>
            The process for buying a used car from our dealership involves selecting a car you're interested in, test driving it, discussing financing options, and finalizing the purchase. Our team is here to guide you through every step of the way and ensure a smooth and stress-free experience
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}

export default FAQ
