import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-select'
import { dayIdType } from '../types'
import Button from './buttonEmployee'

const UpdateOverride = ({ dayId }: dayIdType) => {
  const [employees, setEmployees] = useState<any[]>([])
  const [selectedOption, setSelectetOption] = useState(null)
  const [employeeId, setEmployeeId] = useState<number>()
  const [sent, setSent] = useState(false)
  const router = useRouter()

  // Henter alle ansatte
  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await fetch('/api/employees/')
        const data = await response.json()
        setEmployees(data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getEmployee()
  }, [])

  // Lagrer employeeId som bruker for å oppdatere hvem som skal lage lunsj
  const handleChange = (selectedOption: any) => {
    setSelectetOption(selectedOption)
    setEmployeeId(selectedOption.id)
  }

  // Funksjon for å endre hvem som skal lage lunsj
  const handleChangeEmployee = async (dayId, employeeId) => {
    console.log(typeof dayId, typeof employeeId)
    try {
      const body = { dayId, employeeId }
      await fetch(`/api/days`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setSent(true)
      setTimeout(() => router.reload(), 1500)
    } catch (error) {
      console.error(error)
    }
  }

  const searchList = employees.map(({ name, id }) => {
    return {
      value: name,
      label: name,
      id: id,
    }
  })

  return (
    <>
      <details className=" justify-center  border-dashed border-1  border-green p-3 px-6 rounded  bg-light">
        <summary className="underline   text-base cursor-pointer">
          Endre ansvarlig
        </summary>
        <div className="flex mt-2 flex-row">
          <Select
            value={selectedOption}
            options={searchList}
            className="w-60 h-12 text-black"
            onChange={handleChange}
            placeholder="Søk.."
            openMenuOnClick={false}
            instanceId="long-value-select"
          />
          <Button
            handleChangeEmployee={handleChangeEmployee}
            dayId={dayId}
            employeeId={employeeId}
          />
        </div>
      </details>
      {sent && (
        <p
          className="p-1 font-semibold"
          id="formSuccess"
          data-testid="form_success"
        >
          Navn er oppdatert!
        </p>
      )}
    </>
  )
}

export default UpdateOverride
