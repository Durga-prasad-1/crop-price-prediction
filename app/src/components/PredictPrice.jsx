import React, { useState } from "react";
import "./PredictPrice.css"; // Import the CSS file for styling
import axios from "axios";
const PredictPrice = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [commodity, setCommodity] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

// Define the base URL and API key
const BASE_URL = "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24";
const API_KEY = "579b464db66ec23bdd0000012b1da8f7341c4b6d54d50a90a9358f6b";


// Function to fetch data for a given district, date, and commodity
async function fetchData(district, date, commodity) {
    const params = {
        "api-key": API_KEY,
        format: "json",
        "filters[State.keyword]": "Telangana",
        "filters[District.keyword]": district,
        "filters[Arrival_Date]": date,
        "filters[Commodity.keyword]": commodity
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        console.log("Data fetched from API");
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch data for ${district} on ${date}: ${error.message}`);
        return null;
    }
}

  const calculateDays = () => {
    const referenceDate = new Date("2024-11-01");
    const currentDate = new Date();
    const differenceInTime = currentDate - referenceDate; // Difference in milliseconds
    return Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Convert to days
  };

  const handlePredict = async () => {
    const days = calculateDays(); // Calculate the 'days' parameter dynamically
    const payload = { days,market, commodity,district };
    console.log("Payload being sent:", payload);
    try {
      const response = await fetch("http://127.0.0.1:8800/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // console.log(JSON.stringify({ days, market, commodity, district }));
      const data = await response.json();
      setPredictedPrice(data.prediction);
      console.log(data.prediction);
    } catch (error) {
      console.error("Error predicting price:", error);
    }
  };

  return (
    <div className="predict-page-wrapper">
      <div className="predict-price-container">
        <h2 className="title">Predict Crop Price</h2>
        <form
          className="predict-price-form"
          onSubmit={(e) => {
            e.preventDefault();
            handlePredict();
          }}
        >
          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>District:</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Market:</label>
            <input
              type="text"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Commodity:</label>
            <input
              type="text"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              required
            />
          </div>
          {/* <div className="form-group">
            <label>Today min price:</label>
            <input
              type="text"
              
              
              required
            />
          </div>
          <div className="form-group">
            <label>Today max price:</label>
            <input
              type="text"
              required
            />
          </div> */}
          <button type="submit" className="submit-button">Predict</button>
        </form>
        {predictedPrice && (
          <div className="result">
            <h3>Predicted min Price: {predictedPrice[0]}</h3>
            <h3>Predicted max Price: {predictedPrice[1]}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictPrice;