import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Rules from './../../components/Rules'

const Employee: NextPage = () => {
  const [employees, setEmployees] = useState<any[]>([])

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

  const sortedName = employees?.sort(
    (x: { name: string }, y: { name: string }) => {
      return x.name.localeCompare(y.name)
    }
  )
  return (
    <div id="employees" className="w-full my-0 mx-auto">
      {/* Alle ansatte  */}

      <section className="bg-white p-10">
        <h1 className="text-3xl font-semibold mb-2">Alle ansatte</h1>
        {employees &&
          Object.entries(employees)?.map(
            ([key, employee]: any, index: number) => (
              <li
                className="flex flex-row justify-between w-500px items-center  rounded  p-4 odd:bg-green "
                key={index}
              >
                <span className="w-1/3 font-bold">{employee?.name}</span>
                <span className="w-1/3">
                  <span className="font-semibold">Regler:&nbsp;</span>
                  {employee?.rules}
                </span>
                <span className="w-1/3">
                  <button className="self-end transition ease-in-out delay-75 float-right bg-dark text-white p-1 px-3  rounded  hover:opacity-70 ">
                    <Link href={`/employees/${employee?.id}`}>
                      <a>se ansatt</a>
                    </Link>
                  </button>
                </span>
              </li>
            )
          )}
      </section>
      {/* Regler */}
      <Rules />
    </div>
  )
}
export default Employee
