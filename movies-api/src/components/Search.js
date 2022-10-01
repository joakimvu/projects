const Search = ({ search, setSeach, handleInput, handleSearch }) => {
  return (
    <form onSubmit={handleSearch}>
      <input onChange={handleInput} type="text" placeholder="Søk på filmer" />
      <button type="submit">Søk</button>
    </form>
  );
};

export default Search;
