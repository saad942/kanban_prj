// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const NavBar = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'));

  const handleLogout = () => {
    localStorage.clear('user-info');
    navigate('/');
  };


  return (
      <div className="navbar">
        <div>
        <Link to="/">
          <img
            src="./images/logo.png"
            alt="Company Logo"
            style={{ maxWidth: '80px' }}
          />
        </Link>
        </div>
        <div className="nav-links">
        <span className="nav-link" onClick={() => navigate('/')}>
          Home
        </span>
        <span className="nav-link" onClick={() => navigate('/')}>
          About
        </span>
            {user && (
             
              <>
                <span className="nav-link" onClick={() => navigate('/cart')}>
                cart
               </span>
                  <button onClick={handleLogout} className="btn btn-primary">
                    Logout
                  </button>
              </>
            )}
          
        </div>
      </div>
  );
};

export default NavBar;
