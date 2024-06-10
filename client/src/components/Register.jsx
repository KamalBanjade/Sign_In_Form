import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import "./FormStyles.css";

export default function Register() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
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

    fetch("http://localhost:8082/api/register", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Register failed. Please try again.');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          toast.success('Successfully Registered!');
        } else {
          toast.error('Register failed. Please try again.');
        }
      })
      .catch((err) => {
        toast.error('Account already exists. Please try again.');
      });
  }

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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

        <div className="input-text">
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-box">
          <input
            className="inp-box"
            type="text"
            id="username"
            name="username"
            onChange={handleInput}
            value={userDetails.username}
            autoComplete="username"
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
            autoComplete="password"
            required
          />
        </div>

        <button type="submit" className="btn">
          Sign Up
        </button>

        <div className="register-link">
          <p>
            Already Registered? <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
