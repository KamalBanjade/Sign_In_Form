import { Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

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

    fetch("http://localhost:8082/api/Register", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div className="main">
          <h1>Sign Up</h1>
          <div className="email-text">
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
              required
            />
          </div>

          <button type="submit" className="btn">
            <p className="loginTxt">Sign Up</p>
          </button>

          <div className="register-link">
            <p>
              Already Registered? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
