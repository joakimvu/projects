import prisma from '../../lib/db'
import { UpdateEmployeeWorking } from './../../types/index'

export const updateDay = async ({
  dayId,
  employeeId,
}: UpdateEmployeeWorking) => {
  // Bruker try/catch for å håndtere feil gitt av Prisma
  try {
    // Bruker prisma clienten til å lage override Ansatt
    const overrideEmployee = await prisma.day.update({
      where: {
        id: dayId,
      },
      data: {
        overrideEmployee: {
          connect: {
            id: employeeId,
          },
        },
      },
    })
    return { success: true, data: overrideEmployee }
  } catch (error) {
    return { success: false, error: 'Failed to create employee' }
  }
}
