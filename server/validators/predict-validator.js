const z  = require("zod");
const predictSchema = z.object({
    state: z
    .string({required_error:"State is required"})
    .trim(),
    commodity:z
    .string({required_error:"Commodity should be there"}) 
    .trim(),
    date:z
    .string({required_error:"Date is required"})
    .trim(),
    price:z
    .string({required_error:"price is required"})
    .trim()
});
module.exports = predictSchema;