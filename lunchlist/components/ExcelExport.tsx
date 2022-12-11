import * as XLSX from 'xlsx'

export const ExcelExport = () => {
  const fetchData = async () => {
    console.log('Excel Downloaded')
    try {
      const response = await fetch('/api/download/', {
        method: 'GET',
      })
      const data = await response.json()
      XLSX.writeFile(data?.data, 'Lunsjlisten2022.xlsx')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      className="bg-green text-black p-2 rounded px-6 transition ease-in-out delay-150 hover:bg-gray-700 hover:opacity-70"
      onClick={fetchData}
    >
      Last ned lunsjlisten
    </button>
  )
}
