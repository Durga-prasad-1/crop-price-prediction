const express = require('express');
const price = require("./routes/predict-price");
const chat = require('./controllers/chat');
const extract = require("./controllers/extract");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;

let corsOptions = {
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","HEAD"],
    credentials:true
}

// to avoid cors errors
app.use(cors(corsOptions));
app.use(express.json());
app.use("/predict-price",price);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post("/api/chat",chat);
// app.post('/api/extract',extract);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
