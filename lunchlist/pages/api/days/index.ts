import type { NextApiRequest, NextApiResponse } from 'next'
import * as daysController from '../../../features/days/days.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'patch':
      await daysController.updateDay(req, res)
      break
    // case 'get':
    //   await daysController.getEmployee(req, res)
    //   break
    default:
      // Gir 405 Method Not Allowed hvis brukeren prøver på noe annet enn PATCH eller GET
      res.status(405).end
  }
}
