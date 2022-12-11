import prisma from '../../lib/db'
import { IdQuery, IdQueryList } from './../../types/index'

export const findWeeks = async () => {
  // Henter alle uker
  try {
    const lunch = await prisma.week.findMany({
      include: {
        day: {
          include: {
            employee: true,
            overrideEmployee: true,
          },
        },
      },
    })
    return { success: true, data: lunch }
  } catch (error) {
    return { success: false, error: 'Failed to find weeks' }
  }
}

export const findWeek = async ({ id }: IdQuery) => {
  // Henter en gitt uke
  try {
    const lunch = await prisma.week.findMany({
      where: {
        week: Number(id),
      },
      include: {
        day: {
          include: {
            employee: true,
            overrideEmployee: true,
          },
        },
      },
    })
    return { success: true, data: lunch }
  } catch (error) {
    return { success: false, error: 'Failed to find week' }
  }
}

export const findWeekFromToo = async ({ idList }: IdQueryList) => {
  // Henter uker fra til
  try {
    const lunch = await prisma.week.findMany({
      where: {
        week: { in: idList },
      },
      include: {
        day: {
          include: {
            employee: true,
            overrideEmployee: true,
          },
        },
      },
    })
    return { success: true, data: lunch }
  } catch (error) {
    return { success: false, error: 'Failed to find weeks' }
  }
}
