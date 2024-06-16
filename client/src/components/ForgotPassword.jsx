import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css";

const ForgotPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userValid = async () => {
    const res = await fetch(`https://sign-in-form-4.onrender.com/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    if (data.status !== 201) {
      navigate("*");
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  const setConfirmVal = (e) => {
    setConfirmPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    const res = await fetch(`http://localhost:8009/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    if (data.status === 201) {
      setPassword("");
      setConfirmPassword("");
      toast.success("Password Updated Successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1300); // Navigate to login after 1.3 seconds
    } else {
      toast.error("Token Expired, generate new Link");
    }
    setLoading(false);
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <section className="forgot-password-section">
      <div className="form-container">
        <div className="form-heading">
          <h1>Enter your NEW Password</h1>
        </div>
        <form onSubmit={sendpassword}>
          <div className="form-input">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={setval}
              id="password"
              placeholder="Enter Your New Password"
            />
          </div>
          <div className="form-input">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={setConfirmVal}
              id="confirmPassword"
              placeholder="Confirm Your Password"
            />
          </div>
          <button className="custom-button" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default ForgotPassword;
