import React from "react";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../utils/mutations";
import AuthService from "../utils/auth";

const Logout = () => {
  const [logout, { loading, error }] = useMutation(LOGOUT_MUTATION);

  const handleLogout = () => {
    logout()
      .then((response) => {
        AuthService.logout();
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Logout Page</h1>
      <button onClick={handleLogout}>Logout</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Logout;
