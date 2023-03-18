import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import BlankLayoutWHeader from 'src/@core/layouts/BlankLayoutWHeader'
import CheckoutForm from './CheckoutForm'
import { createPaymentIntent, getPaymentConfig } from 'src/services/checkout'
import { Elements } from '@stripe/react-stripe-js'
import { Box, Card, Container } from '@mui/material'

const CheckoutPage = () => {
  const router = useRouter()
  const { amount, currency } = router.query

  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    getPaymentConfig().then(async r => {
      const { publishableKey } = await r.data

      setStripePromise(loadStripe(publishableKey))
    })
  }, [])

  useEffect(() => {
    createPaymentIntent({ amount, currency }).then(async r => {
      const { clientSecret } = await r.data

      setClientSecret(clientSecret)
    })
  }, [])

  return (
    <Box display='flex' flexDirection='column' justifyContent='center'>
      <Box sx={{ margin: '50px auto' }}>
        <h1>Checkout</h1>

        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </Box>
    </Box>
  )
}

CheckoutPage.getLayout = page => <BlankLayoutWHeader>{page}</BlankLayoutWHeader>

export default CheckoutPage
