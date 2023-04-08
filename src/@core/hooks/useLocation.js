import { useEffect, useState } from 'react'

const useLocation = () => {
  const [country, setCountry] = useState('')
  const [error, setError] = useState(false)

  const api = 'https://api.country.is'

  const fetchData = async () => {
    try {
      const res = await fetch(api)
      if (!res.ok) {
        throw Error(res.statusText)
      }
      const { country } = await res.json()
      if (country) {
        setCountry(country)
      }
    } catch (err) {
      console.error(err)
      setError(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { country, error }
}

export default useLocation
