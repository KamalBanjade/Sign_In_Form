//Importing all the needed libraries and all
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

//defining register function
export default function Register() {
  //useState definition for user details and all the fields
  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
    password: "",
  });

  //function to handel inputs i.e. fill userDetails fields with entered values in text box
  function handelInput(event) {
    setUserDetails((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }; //this is the syntax, learn on the go
    });
  }
  function handelSubmit(event) {
    event.preventDefault();

    //function to handel submit and call apis
    fetch("http://localhost:8082/api/Register", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json()) //for getting only the sent response from backend and removing other info
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //basic HTML and for form design
  return (
    <div className="wrapper">
      <form className="form" onSubmit={handelSubmit}>
        <div className="main">
          <h1>Sign Up</h1>
          <div className="email-text">
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-box">
            <input
              className="inp-box"
              type="email"
              name="email"
              onChange={handelInput}
              value={userDetails.email}
              required
            ></input>
          </div>

          <div className="input-text">
            <label htmlFor="text">Username</label>
          </div>
          <div className="input-box">
            <input
              className="inp-box"
              type="text"
              name="username"
              onChange={handelInput}
              value={userDetails.username}
              required
            ></input>
          </div>
          <div className="password-text">
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-box">
            <input
              className="inp-box"
              type="password"
              name="password"
              onChange={handelInput}
              value={userDetails.password}
              required
            ></input>
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