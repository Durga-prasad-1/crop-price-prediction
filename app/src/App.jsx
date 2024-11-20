import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PredictPrice from "./components/PredictPrice";
import PreviousPrices from "./components/PreviousPrices";
// import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict-price" element={<PredictPrice />} />
        <Route path="/previous-prices" element={<PreviousPrices />} />
        {/* <Route path="/chat" element={<Chatbot/>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
