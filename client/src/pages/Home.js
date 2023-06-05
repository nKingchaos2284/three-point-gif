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
    <div>
      <header>
        <Link to="/">
          <h1>In A GIFFY</h1>
        </Link>
        <Link to="/search">
          <h2>To Search Page</h2>
          </Link> 
        <form className="searchbar-form" onSubmit={handleSearch}>
        </form>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </header>
    </div>
  );
};

export default Home;
