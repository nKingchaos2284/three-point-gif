import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search/${searchTerm}`);
  };

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/logout">
        <button>Logout</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default Home;
