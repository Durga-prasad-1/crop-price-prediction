const z  = require("zod");
const predictSchema = z.object({
    days: z
    .string({required_error:"days is required"})
    .trim(),
    market:z
    .string({required_error:"market should be there"}) 
    .trim(),
    commodity:z
    .string({required_error:"commodity is required"})
    .trim(),
    district:z
    .string({required_error:"district is required"})
    .trim()
});
module.exports = predictSchema;