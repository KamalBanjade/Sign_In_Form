import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const navigate = useNavigate();

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval({ ...inpval, [name]: value });
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { fname, email, password, cpassword } = inpval;

    if (fname === "") {
      toast.error("Please enter your name");
    } else if (email === "") {
      toast.error("Please enter your email");
    } else if (!email.includes("@")) {
      toast.error("Include @ in your email!");
    } else if (password === "") {
      toast.error("Please enter your password");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
    } else if (cpassword === "") {
      toast.error("Please enter your confirm password");
    } else if (cpassword.length < 6) {
      toast.error("Confirm Password must be at least 6 characters");
    } else if (password !== cpassword) {
      toast.error("Password and Confirm password do not match");
    } else {
      const data = await fetch("https://sign-in-form-4.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fname, email, password, cpassword })
      });

      const res = await data.json();
      if (res.status === 201) {
        toast.success("Registration Successful!");
        setInpval({ fname: "", email: "", password: "", cpassword: "" });
        setTimeout(() => {
          navigate("/");
        }, 1300); // Navigate to home (login page) after 1.3 seconds
      } else {
        toast.error("Registration Failed");
      }
    }
    setLoading(false);
  };

  return (
    <section className="register-section">
      <div className="form-container">
        <div className="form-heading">
          <h1>Sign Up</h1>
          <div className="form-footer">
            <p>Please Register if you are new.</p>
          </div>
        </div>
        <form onSubmit={addUserdata}>
          <div className="form-input">
            <label htmlFor="fname">Name</label>
            <input
              type="text"
              onChange={setVal}
              value={inpval.fname}
              name="fname"
              id="fname"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={setVal}
              value={inpval.email}
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
                onChange={setVal}
                value={inpval.password}
                name="password"
                id="password"
                placeholder="Enter Your Password"
              />
            </div>
          </div>
          <div className="form-input">
            <label htmlFor="cpassword">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={cpassShow ? "text" : "password"}
                onChange={setVal}
                value={inpval.cpassword}
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <button className="custom-button" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
          <div className="form-footer">
            <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Register;
