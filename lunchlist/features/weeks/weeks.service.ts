import * as weeksRepository from '../weeks/weeks.repository'
import { IdQuery, IdQueryList } from './../../types/index'
import * as XLSX from 'xlsx'

//Henter ut alle uker
export const getWeeks = async () => {
  // Henter ut alle ansatte i repository
  const allWeeks = await weeksRepository.findWeeks()

  if (allWeeks?.error) return { success: false, error: allWeeks.error }

  return { success: true, data: allWeeks.data }
}

//Henter ut en gitt uke
export const getWeek = async ({ id }: IdQuery) => {
  // Henter employee sine arbeidsuker og dag i repository
  const oneWeek = await weeksRepository.findWeek({ id })

  if (oneWeek?.error) return { success: false, error: oneWeek.error }

  return { success: true, data: oneWeek.data }
}

//Henter ut gitte uker fra x til y
export const getWeekFromToo = async ({ idList }: IdQueryList) => {
  // Henter employee sine arbeidsuker og dag i repository
  const weeksFromTo = await weeksRepository.findWeekFromToo({ idList })

  if (weeksFromTo?.error) return { success: false, error: weeksFromTo.error }

  return { success: true, data: weeksFromTo.data }
}

// Laste ned lunsjlista for hele året
export const downloadLunch = async () => {
  const lunch = (await getWeeks()).data
  const reMappedData = lunch.map((week) => {
    if (week.day.length === 0) {
      return {
        Uke: week.week,
        Mandag: 'Ferie',
        Tirsdag: 'Ferie',
        Onsdag: 'Ferie',
        Torsdag: 'Ferie',
        Fredag: 'Ferie',
      }
    }
    return {
      Uke: week.week,
      ...week.day
        .map((day) => {
          return { [day.name]: day.employee.name }
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {}),
    }
  })

  const workBook = XLSX.utils.book_new()
  const workSheet = XLSX.utils.json_to_sheet(reMappedData)
  XLSX.utils.book_append_sheet(workBook, workSheet, 'Lunsjlisten2022')
  XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })
  XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })

  return { success: true, data: workBook }
}
