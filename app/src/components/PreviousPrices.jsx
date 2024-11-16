// import React, { useState, useEffect } from "react";

// const PreviousPrices = () => {
//   const [prices, setPrices] = useState([]);

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/previous-prices");
//         const data = await response.json();
//         setPrices(data);
//       } catch (error) {
//         console.error("Error fetching previous prices:", error);
//       }
//     };

//     fetchPrices();
//   }, []);

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Previous Day Prices</h2>
//       <ul>
//         {prices.map((price, index) => (
//           <li key={index}>
//             {price.crop} - {price.location}: {price.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PreviousPrices;


// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import "chart.js/auto";

// const PreviousPrices = () => {
//   const [prices, setPrices] = useState([]);
//   const [filteredPrices, setFilteredPrices] = useState([]);
//   const [state, setState] = useState("");
//   const [district, setDistrict] = useState("");
//   const [market, setMarket] = useState("");
//   const [commodity, setCommodity] = useState("");

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/previous-prices");
//         const data = await response.json();
//         setPrices(data);
//       } catch (error) {
//         console.error("Error fetching previous prices:", error);
//       }
//     };

//     fetchPrices();
//   }, []);

//   const handleFilter = () => {
//     const filtered = prices.filter((price) => 
//       (state ? price.state.toLowerCase() === state.toLowerCase() : true) &&
//       (district ? price.district.toLowerCase() === district.toLowerCase() : true) &&
//       (market ? price.market.toLowerCase() === market.toLowerCase() : true) &&
//       (commodity ? price.commodity.toLowerCase() === commodity.toLowerCase() : true)
//     );
//     setFilteredPrices(filtered);
//   };

//   const chartData = {
//     labels: filteredPrices.map((price, index) => `Day ${index + 1}`),
//     datasets: [
//       {
//         label: `${commodity || "Commodity"} Price Over Time`,
//         data: filteredPrices.map((price) => price.price),
//         fill: false,
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.4)",
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       height: "100vh",
//       padding: "2rem",
//       boxSizing: "border-box",
//       textAlign: "center",
//     }}>
//       <h2>Previous Day Prices</h2>
      
//       <div style={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr",
//         gap: "1.5rem",
//         width: "100%",
//         maxWidth: "600px",
//         margin: "1rem 0 2rem",
//         padding: "1rem",
//         boxSizing: "border-box",
//       }}>
//         <div>
//           <label>State:</label>
//           <input
//             type="text"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             style={{ width: "100%", padding: "0.75rem", borderRadius: "5px", marginTop: "0.5rem" }}
//           />
//         </div>
//         <div>
//           <label>District:</label>
//           <input
//             type="text"
//             value={district}
//             onChange={(e) => setDistrict(e.target.value)}
//             style={{ width: "100%", padding: "0.75rem", borderRadius: "5px", marginTop: "0.5rem" }}
//           />
//         </div>
//         <div>
//           <label>Market:</label>
//           <input
//             type="text"
//             value={market}
//             onChange={(e) => setMarket(e.target.value)}
//             style={{ width: "100%", padding: "0.75rem", borderRadius: "5px", marginTop: "0.5rem" }}
//           />
//         </div>
//         <div>
//           <label>Commodity:</label>
//           <input
//             type="text"
//             value={commodity}
//             onChange={(e) => setCommodity(e.target.value)}
//             style={{ width: "100%", padding: "0.75rem", borderRadius: "5px", marginTop: "0.5rem" }}
//           />
//         </div>
//       </div>

//       <button 
//         onClick={handleFilter} 
//         style={{
//           padding: "0.75rem 1.5rem",
//           marginBottom: "2rem",
//           borderRadius: "5px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Filter Prices
//       </button>
      
//       {filteredPrices.length > 0 ? (
//         <div style={{ width: "100%", maxWidth: "800px" }}>
//           <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
//         </div>
//       ) : (
//         <p>No data available for the selected filters.</p>
//       )}
//     </div>
//   );
// };

// export default PreviousPrices;


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
