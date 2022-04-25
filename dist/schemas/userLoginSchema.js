import joi from "joi";
var userLoginSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
    password: joi.string().min(3).required()
});
export default userLoginSchema;
