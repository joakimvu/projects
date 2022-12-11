import { useState } from 'react'

export const useRequiredValidation = (value: string) => {
  const [error, setError] = useState('')

  const onBlur = () => {
    setError(!value ? 'Feltet er påkrevd' : '')
  }

  return { error, onBlur }
}
