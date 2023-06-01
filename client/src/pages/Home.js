import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../utils/auth";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const isAuthenticated = AuthService.isLoggedIn();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search/${searchTerm}`);
  };

  const handleLogout = () => {
    AuthService.logout();
    history.push("/login");
  };

  return (
    <header>
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
      {isAuthenticated ? (
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
