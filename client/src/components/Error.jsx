import React from 'react';
import { NavLink } from 'react-router-dom';
import './mix.css';

const Error = () => {
  return (
    <section className="error-section">
      <div className="container">
        <div className="error-content">
          <h2>PAGE NOT FOUND</h2>
          <NavLink to="/" className="custom-button error-btn">Back To Home Page</NavLink>
        </div>
      </div>
    </section>
  );
};

export default Error;
