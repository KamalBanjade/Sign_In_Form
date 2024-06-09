import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FormStyles.css";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    fetch("http://localhost:8082/api/passwordreset/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => { throw new Error(text) });
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Password reset successfully!');
      })
      .catch((err) => {
        toast.error(`Failed to reset password: ${err.message}`);
      });
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div className="main">
          <h1>Reset Password</h1>
          <div className="input-text">
            <label htmlFor="password">New Password</label>
          </div>
          <div className="input-box">
            <input
              className="inp-box"
              type="password"
              id="password"
              name="password"
              onChange={handleInput}
              value={password}
              required
            />
          </div>
          <div className="input-text">
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <div className="input-box">
            <input
              className="inp-box"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleInput}
              value={confirmPassword}
              required
            />
          </div>
          <button type="submit" className="btn">
            <p className="loginTxt">Reset Password</p>
          </button>
        </div>
      </form>
    </div>
  );
}
