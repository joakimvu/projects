import client from '../client'

export const getLessons = async () => {
  try {
    const data = await client.fetch(`*[_type == "lesson"]`)
    return data
  } catch (error) {
    // Sender feilmelding tilbake om noe går galt
    throw new Error(error)
  }
}
