const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const chat  = async (req, res) => {
    const { prompt } = req.body;
    try {
        const promptTitle = "Act like a chatbot and give me the response for the following prompt"+prompt;
        const response = await axios.post(
            "https://generativeai.googleapis.com/v1/gemini-1.5-flash:generateContent",
            { promptTitle },
            { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error generating response");
    }
};

module.exports = chat;