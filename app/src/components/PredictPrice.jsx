import React, { useState } from "react";

const PredictPrice = () => {
  const [crop, setCrop] = useState("");
  const [location, setLocation] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop, location }),
      });
      const data = await response.json();
      setPredictedPrice(data.price);
    } catch (error) {
      console.error("Error predicting price:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Predict Crop Price</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePredict();
        }}
      >
        <div>
          <label>Crop: </label>
          <input
            type="text"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location: </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Predict</button>
      </form>
      {predictedPrice && (
        <div>
          <h3>Predicted Price: {predictedPrice}</h3>
        </div>
      )}
    </div>
  );
};

export default PredictPrice;
