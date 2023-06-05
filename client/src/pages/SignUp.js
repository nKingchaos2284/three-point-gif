import React, { useState } from "react";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  

  return (
    <header class="navbar">
      <h1 class="navbar-brand">Sign Up</h1>
      <Link to="/">
      <h2>In A GIFFY</h2>
      </Link>
      <form className="searchbar-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          class="searchbar"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          class="searchbar"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button class="search-button" type="submit">Sign Up</button>
      </form>
    </header>
  );
};

export default SignUp;
