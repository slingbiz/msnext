import { Button, Card, CardContent, CardHeader, Grid, Input, InputLabel, Typography } from '@mui/material'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { SERVICE_URL } from 'src/constants/common'
import Router from 'next/router'
import { createPaymentIntent } from 'src/services/checkout'

function CheckoutForm({ priceId, interval }) {
  // collect data from the user
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState(null)
  const [onePayment, setOnePayment] = useState(false)

  // stripe items
  const stripe = useStripe()
  const elements = useElements()

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontSmoothing: 'antialiased',
        fontSize: '18px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146',
        iconColor: '#9e2146'
      }
    }
  }

  // main function
  const createSubscription = async () => {
    setProcessing(true)

    // check if the user has already paid
    if (onePayment === true) {
      return
    }

    // create a payment method
    const paymentMethod = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement),
      billing_details: {
        name,
        email
      }
    })

    createPaymentIntent({
      paymentMethod: paymentMethod?.paymentMethod?.id,
      name,
      email,
      priceId
    })
      .then(res => {
        const subscriptionId = res?.data?.subscriptionId
        console.log('subscriptionId: ', subscriptionId)
        stripe
          .confirmCardPayment(res?.data?.clientSecret)
          .then(result => {
            setOnePayment(true)
            setProcessing(false)
            const { amount, currency, id, status } = result?.paymentIntent

            Router.push(
              {
                pathname: '/checkout/Completion',
                query: { amount, currency, id, interval, status, subscriptionId }
              },
              '/checkout/Completion'
            )
          })
          .catch(err => {
            setMessage(err?.response?.data?.error?.message)
            setProcessing(false)
          })
      })
      .catch(err => {
        setMessage(err?.response?.data?.error?.message)
        setProcessing(false)
      })
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', padding: 5 }}>
      <CardHeader title='Checkout' />
      <CardContent>
        <form id='payment-form'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input fullWidth placeholder='Name' type='text' value={name} onChange={e => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <Input fullWidth placeholder='Email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='cardNumber' sx={{ marginBottom: 2 }}>
                Card Details
              </InputLabel>
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant='contained'
                type='submit'
                sx={{ marginTop: 5 }}
                onClick={e => {
                  e.preventDefault()
                  createSubscription()
                }}
                disabled={!stripe || processing}
              >
                <span id='button-text'>{processing ? 'Processing ... ' : 'Pay now'}</span>
              </Button>
              {message && (
                <Typography variant='body1' marginY={10} color='red'>
                  {message}
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CheckoutForm
