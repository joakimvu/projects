import type { NextApiRequest, NextApiResponse } from 'next'
import * as weeksController from '../../../features/weeks/weeks.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await weeksController.downloadLunch(req, res)
      break
    default:
      // Gir 405 Method Not Allowed hvis brukeren prøver på noe annet enn GET
      res.status(405).end
  }
}
