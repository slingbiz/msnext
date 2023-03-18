import { Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentElement } from '@stripe/react-stripe-js'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/Completion`
      }
    })

    if (error) {
      setMessage(error.message)
    }

    setIsProcessing(false)
  }

  return (
    <Card sx={{ width: '50vw', height: 500, minWidth: 275, maxWidth: 600, padding: '20px' }}>
      <form id='payment-form' onSubmit={handleSubmit}>
        <PaymentElement />
        <Button variant='outlined' disabled={isProcessing} type='submit' sx={{ marginTop: 10 }}>
          <span id='button-text'>{isProcessing ? 'Processing ... ' : 'Pay now'}</span>
        </Button>
        {message && (
          <Typography variant='body1' marginY={10}>
            {message}
          </Typography>
        )}
      </form>
    </Card>
  )
}

export default CheckoutForm
