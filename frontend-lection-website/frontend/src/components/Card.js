export default function Card({ title, slug, description, category }) {
  const path = `/kurs/${slug}`
  return (
    // LÅNT KODE: Gjør første bokstav stor
    // https://flexiple.com/javascript-capitalize-first-letter/
    <article data-testid="course_wrapper">
      <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
      <h3 data-testid="courses_title">
        <a href={path}>{title}</a>
      </h3>
      <p data-testid="courses_description">{description}</p>
      <a data-testid="courses_url" href={path}>
        Til kurs
      </a>
    </article>
  )
}
