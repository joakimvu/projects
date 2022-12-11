import { employees } from './../../../data/employees'
import demodata from './../../../data/lunch.json'
import prisma from '../../../lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // Sletter alt fra databasen før den fylles
  await prisma.day.deleteMany({})
  await prisma.week.deleteMany({})
  await prisma.lunch.deleteMany({})
  await prisma.employee.deleteMany({})

  // Fyller databasen med ansatte
  await Promise.all(
    employees.map(async (user) => {
      await prisma.employee.create({
        data: {
          ...user,
        },
      })
    })
  )

  const lunch = await prisma.lunch.create({ data: {} })

  for (const [weekNumber, weekData] of Object.entries(demodata.year)) {
    const week = await prisma.week.create({
      data: {
        week: Number(weekNumber),
        lunch: {
          connect: {
            id: lunch.id,
          },
        },
      },
    })

    for (const [dayName, dayData] of Object.entries(weekData.week)) {
      if (dayData?.id) {
        await prisma.day.create({
          data: {
            name: dayName,
            week: {
              connect: {
                id: week?.id,
              },
            },
            employee: {
              connect: {
                id: dayData.id,
              },
            },
          },
        })
      }
    }
  }

  res.status(200).json({ success: true, data: 'Database is seeded' })
}
