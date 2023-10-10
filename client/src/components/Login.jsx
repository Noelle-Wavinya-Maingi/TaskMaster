import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flashMessage, setFlashMessage] = useState(""); // State for flash message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object with the login credentials
    const loginData = {
      username,
      password,
    };

    try {
      // Send a POST request to your backend's login endpoint
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        // Store the access token and refresh token in localStorage
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        console.log(localStorage);

        // Redirect to the dashboard upon successful login
        navigate("/dashboard");
      } else {
        // Handle login error (e.g., show an error message to the user)
        setFlashMessage(data.message); // Set the flash message
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {flashMessage && <div className="alert alert-danger">{flashMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-sign-in-alt fa-sm"></i>&nbsp; Login
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/registration">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
