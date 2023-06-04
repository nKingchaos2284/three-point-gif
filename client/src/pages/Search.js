import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { SEARCH_GIFS_QUERY } from "../utils/queries";
import AuthService from "../utils/auth";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(SEARCH_GIFS_QUERY, {
    variables: { searchTerm },
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("/search", {
        "giphy-query": searchTerm,
      });
      
      const searchResultUrl = response.data.searchResultUrl;
      console.log(searchResultUrl);

    } catch (error) {
      console.error(error);
    }
  };

  if (!AuthService.isLoggedIn()) {
    return <p>Please log in to use the search feature.</p>;
  }

  return (
    <div>
      <h1>In A GIFFY</h1>
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
        <div className="grid-container">
          <h2>Search Results:</h2>
          {data.gifs.map((gif) => (
            <div id="search-result" key={gif.id}>
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
