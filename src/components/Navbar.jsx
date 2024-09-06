// src/components/Navbar.jsx
//testing

import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <>
      <header>
        {/* <div className="navbar-brand"/> */}
        <nav
          style={{ backgroundColor: "#edb654", color: "white" }}
          role="navigation"
          aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/randommeal" className="navbar-item">
              Random Meal Recipe
            </Link>
            <Link to="/searchbyname" className="navbar-item">
              Find Recipes
            </Link>
            <Link to="/favourites" className="navbar-item">
              Favourite
            </Link>
            {/* <Link to="/products/sage-barista-pro" className="navbar-item">
                  Best Coffee Machine
                </Link> */}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
