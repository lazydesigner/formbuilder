import React from 'react';
import './Navbar.css'; // For styling (CSS file)

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>FormBuilder</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Rapid Forms</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
