import { useState } from 'react'
import { useRequiredValidation } from './useRequiredValidation'

export const useValue = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const { error, onBlur } = useRequiredValidation(value)

  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  return { value, error, onChange, onBlur }
}
