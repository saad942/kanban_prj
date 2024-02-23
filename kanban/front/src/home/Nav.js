// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user-info')) || {};
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClass = `navbar ${scrolled ? 'scrolled' : ''}`;

  return (
    <div className={navbarClass}>
      <div className="navbar-container">
        <Link to="/">
          <img
            src="./images/logo.png"
            alt="Logo"
            style={{ maxWidth: '100px' }}
          />
        </Link>
        <div className="ul">
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/offer">Offer</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <button
          className="button"
          onClick={() => navigate(user.isLoggedIn ? '/home' : '/')}
        >
          Task
        </button>
      </div>
    </div>
  );
};

export default NavBar;
