import authSchema from "../schemas/authorizationSchema.js";

const validateAuth = {
    validateSignUp: (req, res, next) => {
        const { error } = authSchema.signUpSchema.validate(req.body);

        if(error){
            console.log("Entrou aqui")
            return res.status(422).send(error.details[0].message);
        }else{
            next();
        }
    }
}

export default validateAuth;