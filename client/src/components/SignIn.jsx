import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      .then((response) => {
        if (!response.ok) {
          // If response status is not OK, throw an error
          throw new Error('Sign-in failed. Please try again.');
        }
        // If response status is OK, return the response JSON data
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Check if the response data indicates successful sign-in
        if (data.success) {
          // If sign-in is successful, show success toast
          toast.success('Successfully signed in!');
          // Redirect to home page or handle success as needed
        } else {
          // If sign-in fails, show error toast
          toast.error('Sign-in failed. Please try again.');
        }
      })
      .catch((err) => {
        console.log(err);
        // If there's an error with the fetch request, show error toast
        toast.error("Account doesn't exist. Please try again.");
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
              id="email"
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
              id="password"
              name="password"
              onChange={handelInputs}
              value={userDetails.password}
              required
            />
          </div>
          <div className="remember-forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
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
