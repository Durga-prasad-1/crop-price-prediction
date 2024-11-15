// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Crop Price Predictor</h1>
      <div style={styles.linkContainer}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/predict-price">Predict Price</Link>
        <Link style={styles.link} to="/previous-prices">Previous Prices</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    top:"2rem",
    width: "100%",                
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 5%",
    backgroundColor: "#008000",
    boxSizing: "border-box",
  },
  title: { 
    color: "white", 
    margin: "0", 
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  linkContainer: {
    display: "flex",
    gap: "1.5rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Lightens background on hover
  },
};

export default Navbar;
