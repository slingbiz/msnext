import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { getPaymentConfig } from 'src/services/checkout'
import { useEffect, useState } from 'react'

const CheckoutPage = () => {
  const [stripePromise, setStripePromise] = useState(null)
  const router = useRouter()

  const { priceId, interval } = router.query

  useEffect(() => {
    getPaymentConfig().then(async r => {
      const { publishableKey } = await r.data

      setStripePromise(loadStripe(publishableKey))
    })
  }, [])

  return (
    <Box display='flex' flexDirection='column' justifyContent='center'>
      <Box sx={{ margin: '50px auto' }}>
        {stripePromise && (
          <Elements stripe={stripePromise}>
            <CheckoutForm priceId={priceId} interval={interval} />
          </Elements>
        )}
      </Box>
    </Box>
  )
}

export default CheckoutPage
