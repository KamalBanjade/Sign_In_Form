import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FormStyles.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8082/api/passwordreset", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then((data) => {
      toast.success('Recovery email sent successfully!');
    })
    .catch((err) => {
      toast.error(`Failed to send recovery email: ${err.message}`);
    });
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div className="main">
          <h1>Forgot Password</h1>
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
              value={email}
              required
            />
          </div>
          <button type="submit" className="btn">
            <p className="loginTxt">Send Reset Link</p>
          </button>
        </div>
      </form>
    </div>
  );
}
