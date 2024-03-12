// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const NavBar = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'));

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    setScrolled(isScrolled);
  };

  const handleLogout = () => {
    localStorage.clear('user-info');
    navigate('/');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const navbarClass = `navbar ${scrolled ? 'scrolled' : ''}`;

  return (
    <div className={navbarClass}>
      <div className="navbar">
        <Link to="/">
          <img
            src="./images/logo.png"
            alt="Company Logo"
            style={{ maxWidth: '100px' }}
          />
        </Link>
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
    </div>
  );
};

export default NavBar;
