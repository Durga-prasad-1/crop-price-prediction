import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Crop Price Predictor</h1>
      <p className="home-description">
        Empowering farmers with data-driven insights to make informed decisions
        on crop pricing and maximize profits.
      </p>
      <div className="home-buttons">
        <button
          className="home-button predict"
          onClick={() => navigate("/predict-price")}
        >
          Predict Price
        </button>
        <button
          className="home-button previous"
          onClick={() => navigate("/previous-prices")}
        >
          Previous Day Prices
        </button>
      </div>
    </div>
  );
};

export default Home;
