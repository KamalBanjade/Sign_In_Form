import { Link } from "react-router-dom";
import { useState } from "react";
import "./SignIn.css";

export default function SignIn() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  function handelInputs(event) {
    setUserDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  function handelSubmit(event) {
    event.preventDefault();
    console.log(userDetails);

    fetch("http://localhost:8082/api/SignIn", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Redirect to home page or handle success as needed
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handelSubmit}>
        <div className="main">
          <h1>Login</h1>
          <p>Welcome back! Please login to your account.</p>
          <div className="input-text">
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-box">
            <input
              className="inp-box"
              type="email"
              name="email"
              onChange={handelInputs}
              value={userDetails.email}
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
              name="password"
              onChange={handelInputs}
              value={userDetails.password}
              required
            />
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="/">Forget Password?</a>
          </div>
          <button type="submit" className="btn">
            <p className="loginTxt">Login</p>
          </button>
          <div className="register-link">
            <p>
              New User?
              <Link to="/Register"> Register</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}