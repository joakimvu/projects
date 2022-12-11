import * as daysRepository from './days.repository'
import { UpdateEmployeeWorking } from '../../types'

export const updateDay = async ({
  dayId,
  employeeId,
}: UpdateEmployeeWorking) => {
  const createdDay = await daysRepository.updateDay({ dayId, employeeId })

  // Feil ved lagring av bruker via ORM
  if (!createdDay.success) return { success: false, error: createdDay.error }

  return { success: true, data: createdDay.data }
}
