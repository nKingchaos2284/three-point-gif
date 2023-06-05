import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import AuthService from "../utils/auth";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(AuthService.isLoggedIn());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  
    if (searchTerm.trim() === "") {
      return;
    }
  
    const token = localStorage.getItem('token');
    
    axios
      .post("/api/search", { "giphy-query": searchTerm }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  
    setSearchTerm("");
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <header>
      <Link to="/">
      <h1>In A GIFFY</h1>
      </Link>
      <form className="searchbar-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a GIF here!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
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
  );
};

export default Home;
