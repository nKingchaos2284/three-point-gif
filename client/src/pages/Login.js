import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await axios.post('/user/login', data);
      const { user, token } = response.data;
      console.log(user);

      localStorage.setItem('token', token);

      history.push('/search');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <h1>Login Page</h1>
      <Link to="/">
      <h2>In A GIFFY</h2>
      </Link>
      <form className="searchbar-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </header>
  );
};

export default Login;
