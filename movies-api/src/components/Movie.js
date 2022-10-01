const Movie = ({ poster, alt, title, year }) => {
  return (
    <li>
      <img src={poster} alt={alt} />
      <section>
        <h2>{title}</h2>
        <p>{`(${year})`}</p>
      </section>
    </li>
  );
};

export default Movie;
