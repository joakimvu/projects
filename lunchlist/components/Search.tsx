import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useRouter } from 'next/router'

const Search = () => {
  const [employees, setEmployees] = useState<any[]>([])
  const [selectedOption, setSelectedOption] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await fetch('/api/employees/')
        const data = await response.json()
        setEmployees(data?.data)
      } catch (error) {
        // console.log(error)
      }
    }
    getEmployee()
  }, [employees])

  useEffect(() => {
    const handleReset = () => {
      if (!router.pathname.startsWith('/employees/')) {
        setSelectedOption(null)
      }
    }

    handleReset()
  }, [router.pathname])

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
    // console.log(selectedOption)
    router.push(`/employees/${selectedOption?.id}`)
  }

  useEffect(() => {
    const handleReset = () => {
      if (!router.pathname.startsWith('/employees/')) {
        setSelectedOption(null)
      }
    }

    handleReset()
  }, [router.pathname])

  const searchList = employees.map(({ name, id }) => {
    return {
      value: name,
      label: name,
      id: id,
    }
  })

  return (
    <>
      <div>
        <Select
          value={selectedOption}
          options={searchList}
          className="w-60 text-black"
          onChange={handleChange}
          placeholder="Søk.."
          openMenuOnClick={false}
          instanceId="long-value-select"
        />
      </div>
    </>
  )
}

export default Search
