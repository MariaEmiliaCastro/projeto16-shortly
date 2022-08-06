import authSchema from "../schemas/authorizationSchema.js";

const validateAuth = {
    validateSignUp: (req, res, next) => {
        console.log("Entrou no validateSignUp");
        const { error } = authSchema.signUpSchema.validate(req.body);

        if(error){
            console.log("Erro no validateAuth middleware");
            return res.status(422).send(error.details[0].message);
        }else{
            next();
        }
    },
    validateSignIn: (req, res, next) => {
        console.log("Entrou no validateSignIn");
        const { error } = authSchema.signInSchema.validate(req.body);

        if(error){
            console.log("Erro no validateAuth middleware");
            return res.status(422).send(error.details[0].message);
        }else{
            console.log("Saindo validateSignIn");
            next();
        }

    }
}

export default validateAuth;