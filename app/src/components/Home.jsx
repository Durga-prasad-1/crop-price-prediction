import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file for styling
import grapesImage from "./img2.jpg"; // Make sure to add the image to your project

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ backgroundImage: `url(${grapesImage})` }}>
      <div className="overlay">
        <h1 className="home-title">Welcome to Your Crop Pricing Companion</h1>
        <p className="home-description">Stay informed with real-time crop prices, predictive analytics, and seasonal trends. Our platform leverages data to help you make smarter choices and optimize profitability. Transform your farming decisions with insights tailored to the agriculture market</p>
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
    </div>
  );
};

export default Home;
