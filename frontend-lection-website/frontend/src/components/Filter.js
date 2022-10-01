import Card from './Card'

export default function Filter({ categoryFilter, courses }) {
  // https://stackoverflow.com/questions/51557853/using-includes-with-map-to-find-matching-values
  let filteredCourses = []

  // Hvis dropdown er på alle, skal alle kursene vises
  if (categoryFilter === 'alle') {
    filteredCourses = [...courses]
  } else {
    filteredCourses = courses?.filter((course) =>
      categoryFilter.includes(course.category)
    )
  }

  return filteredCourses?.map((course) => (
    <Card
      key={course._id}
      title={course.title}
      slug={course.slug}
      description={course.description}
      category={course.category}
    />
  ))
}
