import prisma from '../../lib/db'
import { Employee, Id, UpdateEmployeeName } from '../../types'

export const create = async ({ name, rules }: Employee) => {
  // Bruker try/catch for å håndtere feil gitt av Prisma
  try {
    // Bruker prisma clienten til å lage bruker
    const employee = await prisma.employee.create({
      data: {
        name: name,
        rules: rules,
      },
    })
    return { success: true, data: employee }
  } catch (error) {
    return { success: false, error: 'Failed to create employee' }
  }
}

export const exist = async ({ name }: Employee) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        name,
      },
    })
    return { success: true, data: employee }
  } catch (error) {
    return { success: false, error: 'Failed finding employee' }
  }
}

export const findWeeks = async ({ id }: Id) => {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        id: Number(id),
      },
      include: {
        dayMain: {
          include: {
            week: true,
          },
        },
        dayOverride: {
          include: {
            week: true,
          },
        },
      },
    })
    return { success: true, data: employees }
  } catch (error) {
    return { success: false, error: 'Failed to find employee' }
  }
}

export const findEmployees = async () => {
  // Henter alle ansatte
  try {
    const employees = await prisma.employee.findMany({})
    return { success: true, data: employees }
  } catch (error) {
    return { success: false, error: 'Failed  to find employees' }
  }
}

export const update = async ({ name, id }: UpdateEmployeeName) => {
  try {
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    })
    return { success: true, data: updatedEmployee }
  } catch (error) {
    return { success: false, error: 'Failed to create employee' }
  }
}
