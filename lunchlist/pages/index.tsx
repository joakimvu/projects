import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import UpdateOverride from '../components/UpdateOverride'

const Home: NextPage = () => {
  const [weeks, setWeeks] = useState<any[]>([])

  // Henter lunsjlista for hele året

  useEffect(() => {
    const getWeeks = async () => {
      try {
        const response = await fetch('/api/weeks/')
        const data = await response.json()
        setWeeks(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getWeeks()
  }, [])

  return (
    <>
      <ul className="grid grid-cols-12 mt-10 mb-10">
        {weeks?.map((week) => (
          <li key={week.id} className="m-2">
            <Link href={`/weeks/${week.week}`}>
              <button className="bg-dark text-white  w-full p-2 rounded transition ease-in-out delay-75  hover:opacity-70">
                {week.week}
              </button>
            </Link>
          </li>
        ))}
      </ul>
      <h1 className="text-3xl w-full  p-2  ">Lunsjkalender</h1>
      {weeks?.map((week) => (
        <ul
          key={week.id}
          className="border bg-white border-shade rounded m-2 p-5"
        >
          <>
            <h2 className="font-sans text-2xl mt-4 mb-2 ">
              Uke&nbsp;
              {week.week}
            </h2>
          </>

          {week.day.length > 0 ? (
            <details className="my-4">
              {week?.day?.map((day: any) => (
                <li
                  className="flex flex-col justify-between w-500px mt-3  rounded   "
                  key={day?.id}
                >
                  <div className="flex flex-row justify-between w-500px mt-3  rounded px-6 p-2 odd:bg-green ">
                    <span className="font-semibold">{day?.name}:</span>
                    {day?.overrideEmployee?.id != null ? (
                      <Link href={`/employees/${day?.overrideEmployee?.id}`}>
                        <span
                          key={day?.overrideEmployee?.id}
                          className="cursor-pointer underline hover:no-underline"
                        >
                          {day?.overrideEmployee?.name}
                        </span>
                      </Link>
                    ) : (
                      <Link href={`/employees/${day?.employee.id}`}>
                        <span
                          key={day?.employee.id}
                          className="cursor-pointer underline hover:no-underline"
                        >
                          {day?.employee?.name}
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className="flexb w-full flew-row">
                    <div className="self-end">
                      <UpdateOverride dayId={day?.id} />
                    </div>
                  </div>
                </li>
              ))}
              <summary className="underline hover:no-underline cursor-pointer">
                Se dager
              </summary>
            </details>
          ) : (
            <p className="font-sans font-semibold text-red text-xl mt-4 mb-2 ">
              Ferieuke
            </p>
          )}
        </ul>
      ))}
    </>
  )
}

export default Home
