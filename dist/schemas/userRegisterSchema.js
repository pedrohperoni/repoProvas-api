import joi from "joi";
var userRegisterSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.ref("password")
});
export default userRegisterSchema;
