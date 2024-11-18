import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./PreviousPrices.css";


const PreviousPrices = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [commodity, setCommodity] = useState("");

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

  const handleFilter = () => {
    const filtered = prices.filter(
      (price) =>
        (state ? price.state.toLowerCase() === state.toLowerCase() : true) &&
        (district ? price.district.toLowerCase() === district.toLowerCase() : true) &&
        (market ? price.market.toLowerCase() === market.toLowerCase() : true) &&
        (commodity ? price.commodity.toLowerCase() === commodity.toLowerCase() : true)
    );
    setFilteredPrices(filtered);
  };

  const chartData = {
    labels: filteredPrices.map((price, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: `${commodity || "Commodity"} Price Over Time`,
        data: filteredPrices.map((price) => price.price),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container">
      <h2>Previous Day Prices</h2>

      <div className="form">
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>District:</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Market:</label>
          <input
            type="text"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Commodity:</label>
          <input
            type="text"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleFilter} className="filter-button">
        Filter Prices
      </button>

      {filteredPrices.length > 0 ? (
        <div className="chart-container">
          <Line
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      ) : (
        <p>No data available for the selected filters.</p>
      )}
    </div>
  );
};

export default PreviousPrices;
