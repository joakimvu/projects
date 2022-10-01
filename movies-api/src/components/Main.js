import Search from "./Search";
import Movies from "./Movies";
import { useState, useEffect } from "react";

const Main = () => {
  const [search, setSearch] = useState();
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(false);

  // fetching omdbapi and showing the first 5 starwars movies
  useEffect(() => {
    setLoading(true);
    fetch("http://www.omdbapi.com/?s=Star%20Wars&apikey=5cc65390")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMovies(data.Search.splice(0, 5));
      })
      .catch((error) => console.log(error));
  }, []);

  // handle the input
  const handleInput = (event) => {
    setSearch(event.currentTarget.value);
  };

  // handle the search
  const handleSearch = (event) => {
    event.preventDefault();
    if (search) {
      fetch(`http://www.omdbapi.com/?s=${search}&apikey=5cc65390`)
        .then((response) => response.json())
        .then((data) => setMovies(data.Search))
        .catch((error) => console.log(error));
    }
  };

  return (
    <main>
      <Search
        search={search}
        setSearch={setSearch}
        handleInput={handleInput}
        handleSearch={handleSearch}
      />
      {loading ? <p>Laster inn...</p> : null}
      <Movies movies={movies} />
    </main>
  );
};

export default Main;
