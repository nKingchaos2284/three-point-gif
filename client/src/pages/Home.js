import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../utils/api";
import axios from 'axios';
import AuthService from "../utils/auth";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResultUrl, setSearchResultUrl] = useState([]);

  useEffect(() => {
    setIsLoggedIn(AuthService.isLoggedIn());
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      return;
    }

    try {
      const response = await api.post("", { "giphy-query": searchTerm });

      setSearchResultUrl(response.data.searchResultUrl);
      history.push(`/search?term=${searchTerm}`);
    } catch (error) {
      console.error(error);
    }

    setSearchTerm("");
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <div class="box">
      <nav class="navbar">
        <Link to="/">
          <h2 class="navbar-brand">In A GIFFY</h2>
        </Link>
        <Link to="/search">
          <h3>To Search Page</h3>
          </Link> 
        <form className="searchbar-form" onSubmit={handleSearch}>
        </form>
        {isLoggedIn ? (
          <button class="search-button" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button class="search-button">Login</button>
            </Link>
            <Link to="/signup">
              <button class="search-button">Sign Up</button>
            </Link>
          </>
        )}
      </nav>
          <main>
            <h1 class="welcome">Welcome To In A GIFFY!</h1>
            <p class="info">Please log in or sign up to start searching for GIFs</p>
          </main>
    </div>
  );
};

export default Home;
