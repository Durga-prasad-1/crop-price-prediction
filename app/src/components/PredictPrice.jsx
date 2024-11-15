
// import React, { useState } from "react";
// import "./PredictPrice.css"; // Import the CSS file for styling

// const PredictPrice = () => {
//   const [state, setState] = useState("");
//   const [district, setDistrict] = useState("");
//   const [market, setMarket] = useState("");
//   const [commodity, setCommodity] = useState("");
//   const [predictedPrice, setPredictedPrice] = useState(null);

//   const handlePredict = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/predict-price", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ state, district, market, commodity }),
//       });
//       const data = await response.json();
//       setPredictedPrice(data.price);
//     } catch (error) {
//       console.error("Error predicting price:", error);
//     }
//   };

//   return (
//     <div className="predict-price-container">
//       <h2 className="title">Predict Crop Price</h2>
//       <form
//         className="predict-price-form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           handlePredict();
//         }}
//       >
//         <div className="form-group">
//           <label>State</label>
//           <input
//             type="text"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>District</label>
//           <input
//             type="text"
//             value={district}
//             onChange={(e) => setDistrict(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Market</label>
//           <input
//             type="text"
//             value={market}
//             onChange={(e) => setMarket(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Commodity</label>
//           <input
//             type="text"
//             value={commodity}
//             onChange={(e) => setCommodity(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-button">Predict</button>
//       </form>
//       {predictedPrice && (
//         <div className="result">
//           <h3>Predicted Price: {predictedPrice}</h3>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PredictPrice;

import React, { useState } from "react";
import "./PredictPrice.css"; // Import the CSS file for styling

const PredictPrice = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [commodity, setCommodity] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, district, market, commodity }),
      });
      const data = await response.json();
      setPredictedPrice(data.price);
    } catch (error) {
      console.error("Error predicting price:", error);
    }
  };

  return (
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
        <button type="submit" className="submit-button">Predict</button>
      </form>
      {predictedPrice && (
        <div className="result">
          <h3>Predicted Price: {predictedPrice}</h3>
        </div>
      )}
    </div>
  );
};

export default PredictPrice;
