import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      .then((response) => {
        if (!response.ok) {
          // If response status is not OK, throw an error
          throw new Error('Register failed. Please try again.');
        }
        // If response status is OK, return the response JSON data
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Check if the response data indicates successful registration
        if (data.success) {
          // If registration is successful, show success toast
          toast.success('Successfully Registered!');
        } else {
          // If registration fails, show error toast
          toast.error('Register failed. Please try again.');
        }
      })
      .catch((err) => {
        console.log(err);
        // If there's an error with the fetch request, show error toast
        toast.error('Account already exist. Please try again.');
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
