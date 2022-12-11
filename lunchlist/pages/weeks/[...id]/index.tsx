import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Updateday from '../../../components/UpdateOverride'

const Week: NextPage = () => {
  const [week, setWeek] = useState<any[]>([])
  const router = useRouter()
  const pid = router.query.id
  const weekRange = pid?.length

  useEffect(() => {
    const getWeeks = async () => {
      if (weekRange === 2) {
        try {
          const response = await fetch(`/api/weeks/${pid[0]}/${pid[1]}`)
          const data = await response.json()
          setWeek(data.data)
        } catch (error) {}
      } else {
        const response = await fetch(`/api/weeks/${pid}`)
        const data = await response.json()
        setWeek(data.data)
      }
    }
    getWeeks()
  }, [pid, weekRange])

  return (
    <>
      <Link href="/" passHref>
        <button className="p-2 underline hover:no-underline">Tøm filter</button>
      </Link>
      {week?.map((week) => (
        <ul
          key={week.id}
          className="border bg-white border-shade rounded m-2 p-5"
        >
          <>
            <h2 className="font-sans font-semibold text-3xl mt-4 mb-2 ">
              Uke {week.week}
            </h2>
          </>
          {week.day.length > 0 ? (
            <details className="my-4">
              {/* TODO: fikse styling*/}

              {week?.day?.map((day: any) => (
                <li
                  className="flex flex-col justify-between  mt-3  rounded  "
                  key={day?.id}
                >
                  <div className="flex flex-row justify-between w-500px mt-3  rounded px-6 p-2 odd:bg-green ">
                    <span className="font-semibold">{day?.name}:</span>
                    {day?.overrideEmployee?.id != null ? (
                      <Link href={`/employees/${day?.overrideEmployee?.id}`}>
                        <span
                          key={day?.overrideEmployee?.id}
                          className="cursor-pointer  self-end underline hover:no-underline"
                        >
                          {day?.overrideEmployee?.name}
                        </span>
                      </Link>
                    ) : (
                      <Link href={`/employees/${day?.employee.id}`}>
                        <span
                          key={day?.employee.id}
                          className="cursor-pointer self-end  underline hover:no-underline"
                        >
                          {day?.employee?.name}
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className="flexb w-full flew-row">
                    <div className="self-end">
                      <Updateday dayId={day?.id} />
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
export default Week
