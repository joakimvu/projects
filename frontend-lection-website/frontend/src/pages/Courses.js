import { useState, useEffect } from 'react'
import { categories } from '../data/data'
import Filter from '../components/Filter'
import { getCourses } from '../lib/services/courseService'

export default function Courses() {
  // Brukes til å hente kurs fra Sanity
  const [courses, setCourses] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('alle')

  useEffect(() => {
    try {
      const getCourseData = async () => {
        const data = await getCourses()
        setCourses(data)
      }
      getCourseData()
    } catch (error) {
      // Sender feilmelding tilbake om noe går galt
      throw new Error(error)
    }
  }, [])

  const handleCategoryChange = (event) => {
    const { value } = event.target
    // Gjør nødvendig endring slik at tittel blir oppdatert med verdien valgt i select
    setCategoryFilter(value)
  }

  return (
    <>
      <header>
        <h2 data-testid="title">Alle kurs</h2>
        <label htmlFor="filter">
          <span>Velg kategori:</span>
          <select
            onChange={handleCategoryChange}
            id="filter"
            name="filter"
            data-testid="filter"
          >
            <option value="alle">Alle</option>

            {categories?.map((category) => (
              <option key={category} value={category?.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </header>
      <section id="coursesWrap" data-testid="courses">
        {/* Viser alle kurs */}
        <Filter categoryFilter={categoryFilter} courses={courses} />

        {/* Vis hvis ingen kurs / ingen kurs på en gitt kategori */}
        {categoryFilter === 'empty' ? (
          <p data-testid="empty">Ingen kurs</p>
        ) : null}
      </section>
    </>
  )
}
