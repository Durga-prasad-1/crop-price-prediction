const express = require("express");
const predictSchema = require("../validators/predict-validator");
const validate = require("../middleware/validate-middleware");
const router = express.Router();

router.post("/",validate(predictSchema),(req,res)=>{
    try {
        console.log("predict schema");
    return res.status(200).json({msg:"file nicely gone"});
    } catch (error) {
        return res.status(500).json({msg:"predicted failded due to some errors"});
    }
})
module.exports = router;