import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()

    setIsPending(true)
    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Kunne ikke hente data fra denne ressursen')
        }
        return res.json()
      })
      .then((data) => {
        setData(data)
        setIsPending(false)
        setError(null)
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          setIsPending(false)
          setError(error.message)
        }
      })
    return () => abortController.abort()
  }, [url])
  return { data, isPending, error }
}

export default useFetch
