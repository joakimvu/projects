import Link from 'next/link'
import Search from './Search'
import { ExcelExport } from './ExcelExport'
import { useRouter } from 'next/router'
import Filter from './Filter'

const Navigation = () => {
  const router = useRouter()
  return (
    <header className="w-full my-10 mt-12 ">
      <div className="flex w-full justify-between mb-6 ">
        <h2 className="text-4xl transition font-extrabold ease-in-out delay-75  ">
          {' '}
          <Link href="/">
            <a
              className={
                router.pathname == '/'
                  ? 'transition ease-in-out delay-75  bg-green p-2 px-6 rounded shadow-s hover:opacity-70'
                  : 'transition ease-in-out delay-75  bg-green p-2 px-6 rounded shadow-s hover:opacity-70'
              }
            >
              LUNSJLISTEN
            </a>
          </Link>
        </h2>
        <nav className="mb-7">
          <ul className="flex flex-row gap-x-6 font-semibold items-center text-xl ">
            <li>
              <Link href="/" passHref>
                <a
                  className={
                    router.pathname == '/'
                      ? 'underline hover:opacity-70'
                      : 'hover:opacity-70'
                  }
                >
                  Hjem
                </a>
              </Link>
            </li>
            <li>
              <Link href="/employees">
                <a
                  className={
                    router.pathname == '/employees'
                      ? 'underline hover:opacity-70'
                      : 'hover:opacity-70'
                  }
                >
                  Ansatte
                </a>
              </Link>
            </li>
            <li>
              <Link href="/employees/create">
                <a
                  className={
                    router.pathname == '/employees/create'
                      ? 'underline hover:opacity-70'
                      : 'hover:opacity-70'
                  }
                >
                  Opprett ansatt
                </a>
              </Link>
            </li>
            <li>
              <Link href="/create-lunch">
                <a
                  className={
                    router.pathname == '/create-lunch'
                      ? 'underline hover:opacity-70'
                      : 'hover:opacity-70'
                  }
                >
                  Ny lunchliste
                </a>
              </Link>
            </li>
            <li>
              {/* <button className="bg-black text-white p-2 rounded px-6">
                Last ned lunsjliste
              </button> */}
              <ExcelExport />
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex justify-between bg-white rounded pt-2 pb-10 px-10">
        <div>
          <h2 className="font-bold text-xl my-4">Velg uker</h2>

          <Filter />
        </div>
        <div>
          <h2 className="font-bold text-xl my-4">Finn ansatt</h2>
          <Search />
        </div>
      </div>
    </header>
  )
}

export default Navigation
