const express = require("express");
const predictSchema = require("../validators/predict-validator");
const validate = require("../middleware/validate-middleware");
const predict = require("../controllers/predict-controllers")
const router = express.Router();

router.post("/",validate(predictSchema),predict)
module.exports = router;