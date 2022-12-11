import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useValue } from './../../../hooks/useValue'

const Employee: NextPage = () => {
  const [employee, setEmployee] = useState({})
  const [sent, setSent] = useState(false)
  const router = useRouter()
  const id = Number(router.query.id)

  const { value: name, onChange: onChangeName } = useValue()

  const handleChangeEmployeeName = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { name }
      await fetch(`/api/employees/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      setSent(true)
      setTimeout(() => router.push(`/employees/`), 1500)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/${id}`)
        const data = await response.json()
        setEmployee(data.data[0])
      } catch (error) {
        console.log(error)
      }
    }
    getEmployee()
  }, [id])

  return (
    <main>
      <header className="flex-row bg-white p-5 px-10 rounded flex justify-between items-center align-middle mb-4 ">
        <h1 className="text-3xl mb-2 font-light">{`Lunsjlisten til ${employee?.name}`}</h1>
        <details className=" justify-center border-dashed border-2 w-90 w-1/2 border-green p-3 px-6 rounded align-middle bg-light">
          <summary className="underline font-xl w-90 cursor-pointer">
            Endre navn
          </summary>
          <form className="" onSubmit={handleChangeEmployeeName}>
            <div>
              <input
                value={name}
                onChange={onChangeName}
                className="bg-white border border-shade h-10  w-30 p-2 mt-4 rounded"
              ></input>
              <button
                type="submit"
                className="transition ease-in-out delay-75  bg-dark text-white p-2 h-10 rounded px-6 hover:opacity-70 ml-4 "
              >
                Endre
              </button>
            </div>
            {sent && (
              <p
                className="p-1 font-semibold"
                id="formSuccess"
                data-testid="form_success"
              >
                Navn er oppdatert!
              </p>
            )}
          </form>
        </details>
      </header>
      {employee &&
        Object.entries(employee)?.map(([key, day]: any, index: number) => (
          <div className="grid gap-4 grid-cols-6 " key={key}>
            {Object.entries(day)?.map(
              ([dayKey, dayData]: any, index: number) => (
                <ul
                  className="bg-white flex flex-col justify-center items-center rounded align-middle"
                  key={dayKey}
                >
                  {dayData?.name && (
                    <>
                      <h2 className="font-sans text-xl font-semibold rounded-t text-1xl w-full bg-green p-4">
                        Uke {dayData?.week?.week}:
                      </h2>
                      <li className="flex flex-row justify-between w-full p-4">
                        <span>{dayData?.name}</span>
                      </li>
                    </>
                  )}
                </ul>
              )
            )}
          </div>
        ))}
    </main>
  )
}
export default Employee
