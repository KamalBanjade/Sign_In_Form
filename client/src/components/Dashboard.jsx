import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mix.css';

const Dashboard = () => {
  const [data, setData] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    try {
      const res = await fetch("https://sign-in-form.onrender.com/validuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.status === 401 || !data) {
        navigate("*");
      } else {
        console.log("User verified...", data);
        setLoginData(data);
        navigate("/dash");
      }
    } catch (error) {
      console.error("Error validating user:", error);
      toast.error("Error validating user. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("usersdatatoken");
    setLoginData(null);
    navigate("/");
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);

    const testBackend = async () => {
      try {
        const res = await fetch("https://sign-in-form.onrender.com/test");
        const data = await res.json();
        console.log("Test response:", data);
      } catch (error) {
        console.error("Error with test request:", error);
      }
    };

    testBackend();
  }, []);

  return (
    <>
      {data ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a192f',
          color: '#ccd6f6',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          minWidth: '300px',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <div className="dashboard-container">
            <h1>Welcome, {logindata ? logindata.ValidUserOne.email : ""}</h1>
            <Button variant="contained" onClick={logout} className="custom-button">
              Logout
            </Button>
          </div>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      )}
      <ToastContainer />
    </>
  );
};

export default Dashboard;
