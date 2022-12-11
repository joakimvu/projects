import * as daysService from './days.service'
import type { NextApiRequest, NextApiResponse } from 'next'

// Oppdaterer hvem som skal jobbe på en dag
export const updateDay = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { dayId, employeeId } = req.body

  // Validerer om dayId og employeeId finnes
  // 400 Bad Request. Hvis dayId eller employeeId mangler
  if (!dayId && !employeeId) {
    return res.status(400).json({
      success: false,
      error: 'Mangler obligatorisk felt: dayId, employeeId',
    })
  }

  if (!dayId) {
    return res.status(400).json({
      success: false,
      error: 'Mangler obligatorisk felt: dayId',
    })
  }

  if (!employeeId) {
    return res.status(400).json({
      success: false,
      error: 'Mangler obligatorisk felt: employeeId',
    })
  }

  // Går videre til daysService for updateDay
  const createdOverride = await daysService.updateDay({
    dayId,
    employeeId,
  })

  // 500 Internal Server Error. Hvis noe går galt når employee blir laget
  if (!createdOverride.success) {
    return res.status(500).json({
      success: false,
      error: createdOverride.error,
    })
  }

  // 201 Created. Om alt går bra
  return res.status(201).json({
    success: true,
    data: createdOverride.data,
  })
}
