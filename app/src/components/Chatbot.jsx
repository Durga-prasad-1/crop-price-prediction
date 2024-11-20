import React, { useState } from 'react';
import axios from 'axios';
// import { GoogleGenerativeAI } from "@google/generative-ai"

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    // const API_KEY = process.env.API_KEY;
    // const genAI = new GoogleGenerativeAI(API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const sendMessage = async () => {
        if (input.trim() === "") return;

        setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);
        console.log(input)
        try {
            const res = await axios.post("http://localhost:5000/api/chat", { prompt: input });
            const botResponse = res.data.text || "Sorry, I couldn't generate a response.";
            setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Error fetching response." }]);
        }
    
        setInput("");
    };

    return (
        <div style={{ width: "400px", margin: "0 auto", padding: "10px", border: "1px solid #ccc", background:"white"}}>
            <h3>Chatbot</h3>
            <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                        <p><strong>{msg.sender}:</strong> {msg.text}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                style={{ width: "80%" }}
            />
            <button onClick={sendMessage} style={{ width: "20%" }}>Send</button>
        </div>
    );
};

export default Chatbot;
