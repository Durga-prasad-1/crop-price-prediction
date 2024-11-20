import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./PreviousPrices.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const PreviousPrices = () => {
  const [prices, setPrices] = useState([]);
  const [data,setData] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [commodity, setCommodity] = useState("");
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/previous-prices");
  //       const data = await response.json();
  //       setPrices(data);
  //     } catch (error) {
  //       console.error("Error fetching previous prices:", error);
  //     }
  //   };

  //   fetchPrices();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    const payload = {commodity,market,district};
    try {
      console.log(payload)
      const response = await fetch("http://127.0.0.1:8800/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // console.log(response);
      // setData(response.data);
      const result = response.json();
      result
      .then((data)=>setData(data.data))
      .catch((err)=>console.log(err));
      console.log(data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Error fetching data');
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };


  return (
    <div className="container">
      <h2>Previous Day Prices</h2>

      <div className="form">
        
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

      <button onClick={handleSubmit} className="filter-button">
        Filter Prices
      </button>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="Modal_Price" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="Arrival_Date" />
          <YAxis />
      </LineChart>
      
      {/* <Chatbot/> */}
    </div>
  );
};

export default PreviousPrices;
