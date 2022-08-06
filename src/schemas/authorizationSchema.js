import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.any().valid(joi.ref('password')).required().options({ messages: { 'any.only': '{{#label}} does not match password'} })
});

const signInSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required()
});

export default {
    signUpSchema,
    signInSchema
}