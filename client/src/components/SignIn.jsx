import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import "./FormStyles.css";

export default function SignIn() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  function handleInput(event) {
    setUserDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log('Submitting user details:', userDetails);

    fetch("http://localhost:8082/api/signin", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Sign-in failed. Please try again.');
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Successfully signed in!');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Welcome back! Please login to your account.</p>
        <div className="input-text">
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-box">
          <input
            className="inp-box"
            type="email"
            id="email"
            name="email"
            onChange={handleInput}
            value={userDetails.email}
            autoComplete="email"
            required
          />
        </div>
        <div className="password-text">
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-box">
          <input
            className="inp-box"
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
            value={userDetails.password}
            autoComplete="current-password"
            required
          />
        </div>
        <div className="remember-forget">
          <label htmlFor="remember">
            <input type="checkbox" id="remember" />
            Remember Me
          </label>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="register-link">
          <p>
            New User? <Link to="/Register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
