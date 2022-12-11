import * as employeesService from './employees.service'
import type { NextApiRequest, NextApiResponse } from 'next'

// Lage en ansatt
export const createEmployee = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { name, rules } = req.body

  // Validerer om name og rules finnes
  // 400 Bad Request. Hvis navn eller regler mangler
  if (!name && !rules) {
    return res.status(400).json({
      success: false,
      error: 'Mangler obligatorisk felt: navn, regler',
    })
  }
  if (!name) {
    return res
      .status(400)
      .json({ success: false, error: 'Mangler obligatorisk felt: navn' })
  }
  if (!rules) {
    return res
      .status(400)
      .json({ success: false, error: 'Mangler obligatorisk felt: regler' })
  }

  // Går videre til employeesService for å lage bruker
  const createdEmployee = await employeesService.create({
    name,
    rules,
  })

  // 500 Internal Server Error. Hvis noe går galt når employee blir laget
  if (!createdEmployee.success) {
    return res.status(500).json({
      success: false,
      error: createdEmployee.error,
    })
  }

  // 201 Created. Om alt går bra
  return res.status(201).json({
    success: true,
    data: createdEmployee.data,
  })
}

// Hente en ansatt
export const getEmployee = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  // Hente ut id fra url
  const { id } = req.query

  // Sjekker om id har blitt hentet
  // 400 Bad Request. Hvis id mangler
  if (!id)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: id',
    })

  // Går videre til getEmployeeWeeks for å hente en ansatt sine arbeidsdager
  const employee = await employeesService.getEmployeeWeeks({ id })

  // 500 Internal Server Error. Hvis noe går galt når employee blir hentet
  if (!employee?.success) {
    return res.status(500).json({
      success: false,
      error: employee.error,
    })
  }
  // 200 Get. Om alt går bra
  return res.status(200).json({
    success: true,
    data: employee.data,
  })
}

// Hente alle ansatte
export const getAllEmployees = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  // Går videre til employeesService for å hente info om alle ansatte
  const employees = await employeesService.getAllEmployeesInfo()

  // 500 Internal Server Error. Hvis noe går galt når employee blir hentet
  if (!employees?.success) {
    return res.status(500).json({
      success: false,
      error: employees.error,
    })
  }

  // 200 Get. Om alt går bra
  return res.status(200).json({
    success: true,
    data: employees.data,
  })
}

// Oppdatere en ansatt
export const updateEmployee = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { name } = req.body
  const { id } = req.query

  // Validerer om name og id finnes
  // 400 Bad Request. Hvis navn eller id mangler
  if (!name && !id) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing required fields: name, id' })
  }
  if (!name) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing required fields: name' })
  }
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing required fields: id' })
  }

  // Går videre til employeeService for å oppdatere navn på en ansatt
  const updateEmployeeName = await employeesService.update({
    name,
    id,
  })

  // 500 Internal Server Error. Hvis noe går galt når employee blir laget
  if (!updateEmployeeName.success) {
    return res.status(500).json({
      success: false,
      error: updateEmployeeName.error,
    })
  }

  // 200 Updated. Om alt går bra
  return res.status(200).json({
    success: true,
    data: updateEmployeeName.data,
  })
}
