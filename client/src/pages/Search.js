import React, { useState, useEffect } from "react";
import api from "../utils/api";
import AuthService from "../utils/auth";
import { Link } from 'react-router-dom';

import { useQuery } from "@apollo/client";
import { SEARCH_GIFS_QUERY } from "../utils/queries";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(SEARCH_GIFS_QUERY, {
    variables: { searchTerm },
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/search", {
        "giphy-query": searchTerm,
      });

      const searchResultUrl = response.data.searchResultUrl;
      console.log(searchResultUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenExpiration = AuthService.getTokenExpiration();

      if (tokenExpiration && new Date() > tokenExpiration) {
        AuthService.logout();
      }
    };

    checkTokenExpiration();
  }, []);

  if (!AuthService.isLoggedIn()) {
    return <p>Please log in to use the search feature.</p>;
  }

  return (
    <header>
      <Link to="/">
      <h1>In A GIFFY</h1>
      </Link>
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
    </header>
  );
};

export default Search;
