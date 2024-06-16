import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mix.css'; 

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inpval, setInpval] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval({ ...inpval, [name]: value });
  };

  const loginuser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = inpval;
    if (email === "") {
      toast.error("Email is required!");
    } else if (!email.includes("@")) {
      toast.error("Include @ in your email!");
    } else if (password === "") {
      toast.error("Password is required!");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
    } else {
      try {
        const data = await fetch("https://sign-in-form.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const res = await data.json();
        if (res.status === 201) {
          localStorage.setItem("usersdatatoken", res.result.token);
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/dash");
          }, 1300); // Navigate to dash after 1.3 seconds
          setInpval({ email: "", password: "" });
        } else {
          toast.error("Invalid Credentials");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Error during login. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <section className="login-section">
      <div className="form-container">
        <div className="form-heading">
          <h1>Welcome Back, Please Log In</h1>
        </div>
        <form onSubmit={loginuser}>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={inpval.email}
              onChange={setVal}
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={passShow ? "text" : "password"}
                value={inpval.password}
                onChange={setVal}
                name="password"
                id="password"
                placeholder="Enter Your Password"
              />
              
            </div>
          </div>
          <div className="forgot-password">
          <div className="form-footer">
            <NavLink to="/password-reset">Forgot password?</NavLink>
            </div>
          </div>
          <button className="custom-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="form-footer">
          <p>New? <NavLink to="/register">Sign Up</NavLink></p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Login;