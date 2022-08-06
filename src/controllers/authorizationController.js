import bcrypt from 'bcrypt';
import authRepository from '../repository/authorizationRepository.js';

const authorizationController = {
    signUp: async (req, res) => {
    
        try {
            const verifyIfUserExists = await authRepository.getUserByEmail(req.body.email);

            if(verifyIfUserExists.length > 0){
                return res.sendStatus(409);
            }
    
            const senhaCriptografada = bcrypt.hashSync(req.body.password, 10);
    
            const saveNewUser = await authRepository.insertNewUser(req.body, senhaCriptografada);
    
            return res.sendStatus(saveNewUser);            
        } catch (error) {
            res.sendStatus(500);
        }


    },
    signIn: (req, res) => {
    }
}

export default authorizationController;