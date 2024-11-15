const  validate = (schema)=>async (req,res,next) =>{
    try{
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    }
    catch(e){
        const extraDetails = e.errors[0].message;
        const message = "fill the details properly in prediction";
        const status = 422;
        const err = {status,message,extraDetails}
        console.log(err)
        return res.status(500).json(err);
    }

};

module.exports = validate;