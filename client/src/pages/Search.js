import React, { useState, useEffect } from "react";
import api from "../utils/api";
import AuthService from "../utils/auth";
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultUrl, setSearchResultUrl] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
    
      const response = await api.post("", {
        "giphy-query": searchTerm,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { searchResultUrl } = response.data;
      setSearchResultUrl(searchResultUrl);

      setSearchTerm("");
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
    <div class="box">
      <header class="navbar">
        <Link to="/">
          <h1 class="navbar-brand">In A GIFFY</h1>
        </Link>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a GIF here!"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button class="search-button" type="submit">Search</button>
        </form>
      </header>

      <div class="grid-container">
        {searchResultUrl.map((gif) => (
          <div key={gif.id} id="search-result">
            <img src={gif.images.original.url} alt={gif.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
