import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_GIFS_QUERY } from "../utils/queries";
import AuthService from "../utils/auth";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(SEARCH_GIFS_QUERY, {
    variables: { searchTerm },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(data.gifs);
  };

  if (!AuthService.isLoggedIn()) {
    return <p>Please log in to use the search feature.</p>;
  }

  return (
    <div>
      <h1>In A GIFFY</h1>
      <h2>Search Results...</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a GIF here!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.gifs && (
        <div>
          <h2>Search Results:</h2>
          {data.gifs.map((gif) => (
            <div key={gif.id}>
              <img src={gif.url} alt={gif.title} />
              <p>{gif.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
