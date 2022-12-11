import * as employeesRepository from './employees.repository'
import { UpdateEmployeeName, Id } from './../../types/index'

export const create = async ({
  name,
  rules,
}: {
  name: string
  rules: string
}) => {
  const employee = await employeesRepository.exist({ name, rules })

  // Feil med hentingen av data fra databasen via ORM
  if (employee?.error) return { success: false, error: employee.error }

  // Bruker finnes hvis data har verdi
  if (employee.data) return { success: false, error: 'User already exist' }

  const createdEmployee = await employeesRepository.create({ name, rules })

  // Feil ved lagring av bruker via ORM
  if (!createdEmployee.success)
    return { success: false, error: createdEmployee.error }

  return { success: true, data: createdEmployee.data }
}

export const getEmployeeWeeks = async ({ id }: Id) => {
  // Henter employee sine arbeidsuker og dag i repository
  const employeeWeeks = await employeesRepository.findWeeks({ id })

  if (employeeWeeks?.error)
    return { success: false, error: employeeWeeks.error }

  return { success: true, data: employeeWeeks.data }
}

export const getAllEmployeesInfo = async () => {
  // Henter ut alle ansatte i repository
  const allEmployees = await employeesRepository.findEmployees()

  if (allEmployees?.error) return { success: false, error: allEmployees.error }

  return { success: true, data: allEmployees.data }
}

export const update = async ({ name, id }: UpdateEmployeeName) => {
  const employee = await employeesRepository.exist({ name })

  // Feil med hentingen av data fra databasen via ORM
  if (employee?.error) return { success: false, error: employee.error }

  // Bruker finnes hvis data har verdi
  if (employee.data) return { success: false, error: 'User already exist' }

  const updatedEmployee = await employeesRepository.update({ name, id })

  // Feil ved lagring av bruker via ORM
  if (!updatedEmployee.success)
    return { success: false, error: updatedEmployee.error }

  return { success: true, data: updatedEmployee.data }
}
