import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
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
    signIn: async (req, res) => {
        try {
            const getUser = await authRepository.getUserByEmail(req.body.email);

            if(getUser && bcrypt.compareSync(req.body.password, getUser[0].password)){
                const token = uuid();
                
                const saveNewUser = await authRepository.saveUserSession(getUser[0].id, token);

                if(saveNewUser === 201){
                    return res.send({ token }).status(saveNewUser);
                }else{
                    return res.sendStatus(saveNewUser);
                }               
            }else{
                return res.sendStatus(401);
            }
        } catch (error) {
            
        }
    }
}

export default authorizationController;