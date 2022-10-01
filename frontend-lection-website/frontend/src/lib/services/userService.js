import client from '../client'

export const createUser = async (body) => {
  // Henter ut name og message som funksjonen mottar
  const { name, email } = body
  // Bruker try / catch for å håndtere feil som kan oppstå
  try {
    // Kaller .create
    // Spesifiserer hvor vi skal lagre det (ref name="contact" på schema)
    // Sender med name og message som contact-schema har som felter
    await client.create({ _type: 'user', name, email })
  } catch (error) {
    // Sender feilmelding tilbake om noe går galt
    throw new Error(error)
  }
}

export const getUsers = async () => {
  try {
    const data = await client.fetch(`*[_type == "user"]{name, _id}`)
    return data
  } catch (error) {
    // Sender feilmelding tilbake om noe går galt
    throw new Error(error)
  }
}
