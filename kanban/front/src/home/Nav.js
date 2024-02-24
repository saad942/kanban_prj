// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user-info');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    setScrolled(isScrolled);
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
            alt="Logo"
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
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/cart">Join-us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
