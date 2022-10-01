import client from '../client'

const courseFields = `
  title,
  "slug": slug.current,
  "Lessons": Lessons[]{
    _type == 'reference' => @->,
    _type != 'reference' => @
  },
  category,
  description,
  _id,
`

export const getCourses = async () => {
  try {
    const data = await client.fetch(`
    *[_type == "course"]{${courseFields}}`)
    return data
  } catch (error) {
    // Sender feilmelding tilbake om noe går galt
    throw new Error(error)
  }
}
