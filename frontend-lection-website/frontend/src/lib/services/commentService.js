import client from '../client'

export const createComment = async (body) => {
  // Henter ut name og text som funksjonen mottar
  const { name, text, lessonSlug } = body
  // Bruker try / catch for å håndtere feil som kan oppstå
  try {
    // Kaller .create
    // Spesifiserer hvor vi skal lagre det (ref name="contact" på schema)
    // Sender med name og text
    await client.create({ _type: 'comment', name, text, lessonSlug })
  } catch (error) {
    // Sender feilmelding tilbake om noe går galt
    throw new Error(error)
  }
}

export const getComments = async () => {
  try {
    const data = await client.fetch(
      `*[_type == "comment"]{name, lessonSlug, text, _id}`
    )
    return data
  } catch (error) {
    // Sender feilmelding tilbake om noe går galt
    throw new Error(error)
  }
}
