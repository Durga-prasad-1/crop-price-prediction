const express = require('express');
const price = require("./routes/predict-price");
const app = express();
const port = 5000;

app.use(express.json());
app.use("/predict-price",price);

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
