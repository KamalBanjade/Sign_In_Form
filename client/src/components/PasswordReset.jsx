import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email === "") {
      toast.error("Email is required!");
    } else if (!email.includes("@")) {
      toast.error("Include @ in your email!");
    } else {
      const res = await fetch("https://sign-in-form.onrender.com/sendpasswordlink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (data.status === 201) {
        setEmail("");
        toast.success("Password reset link sent successfully!");
      } else {
        toast.error("Invalid User");
      }
    }
    setLoading(false);
  };

  return (
    <section className="password-reset-section">
      <div className="form-container">
        <div className="form-heading">
          <h1>Enter Your Email</h1>
        </div>
        <form onSubmit={sendLink}>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={setVal}
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
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

export default PasswordReset;
