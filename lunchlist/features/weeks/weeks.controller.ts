import * as weeksService from '../../features/weeks/weeks.service'
import type { NextApiRequest, NextApiResponse } from 'next'

// Hente lunchdata for alle uker
export const getAllWeeks = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const weeks = await weeksService.getWeeks()

  // 500 Internal Server Error. Hvis noe går galt når lunsjen blir hentet
  if (!weeks?.success) {
    return res.status(500).json({
      success: false,
      error: weeks.error,
    })
  }

  // 200 Get. Om alt går bra
  return res.status(200).json({
    success: true,
    data: weeks.data,
  })
}

// Hente lunsjdata for en gitt uke, eller mellom to gitte uker
export const getWeek = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  // Hente ut id fra url
  const { id } = req.query
  const queryLength = id?.length

  if (queryLength === 1) {
    if (!id)
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: id',
      })

    const week = await weeksService.getWeek({ id })

    // 500 Internal Server Error. Hvis noe går galt når employee blir hentet
    if (!week?.success) {
      return res.status(500).json({
        success: false,
        error: week.error,
      })
    }

    // 200 Get. Om alt går bra
    return res.status(200).json({
      success: true,
      data: week.data,
    })
  } else if (queryLength === 2) {
    const idValues = id?.map((s: String) => {
      return Number(s)
    })

    const idList = []
    for (let i = idValues[0]; i <= idValues[1]; i++) {
      idList.push(i)
    }
    if (!id)
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: id',
      })

    const week = await weeksService.getWeekFromToo({ idList })

    // 500 Internal Server Error. Hvis noe går galt når employee blir hentet
    if (!week?.success) {
      return res.status(500).json({
        success: false,
        error: week.error,
      })
    }
    // 200 Get. Om alt går bra
    return res.status(200).json({
      success: true,
      data: week.data,
    })
  } else {
    return res.status(404).json({
      success: false,
      error: 'This page does not exist.',
    })
  }
}

// Laste ned lunsjlista for hele året
export const downloadLunch = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { reMappedData } = req.body

  const lunchlist = await weeksService.downloadLunch({ reMappedData })

  // 500 Internal Server Error. Hvis noe går galt når lunchen blir hentet
  if (!lunchlist?.success) {
    return res.status(500).json({
      success: false,
      error: lunchlist.error,
    })
  }

  // 200 Get. Om alt går bra
  return res.status(200).json({
    success: true,
    data: lunchlist.data,
  })
}
