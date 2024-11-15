import React, { useState, useEffect } from "react";

const PreviousPrices = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("http://localhost:5000/previous-prices");
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching previous prices:", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Previous Day Prices</h2>
      <ul>
        {prices.map((price, index) => (
          <li key={index}>
            {price.crop} - {price.location}: {price.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousPrices;
