import authRepository from "../repository/authorizationRepository.js";
import urlSchema from "../schemas/urlsSchema.js";

const urlsMiddleware = {
    validateUrl: (req, res, next) => {
        const { error } = urlSchema.validate(req.body);

        if(error) return res.status(422).send(error.details[0].message);
        else next();
    },
    verifyParamType: (req, res, next) => {
        
    }
}

export default urlsMiddleware;