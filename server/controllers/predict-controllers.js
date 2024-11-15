const express = require("express");
const axios = require("axios");
const predict = async (req, res) => {
    try {
        // Send the data to Flask API for prediction
        const response = await axios.post("http://127.0.0.1:8800/predict", {
            input: req.body
        });

        // Return the Flask response back to the client
        res.json(response.data);
    } catch (error) {
        console.error("Error calling Flask API:", error.message);
        res.status(500).send("Error calling Flask API");
    }
}

module.exports = predict;