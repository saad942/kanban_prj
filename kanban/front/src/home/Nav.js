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
    localStorage.removeItem('user-info');
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
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/offer">Offer</Link>
            </li>
            {!user ? (
              <li>
                <Link to="/cart">Join-us</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/home">Cart</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-primary">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
