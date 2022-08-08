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
            res.send(error.detail).status(500);
        }


    },
    signIn: async (req, res) => {
        try {
            console.log("Entrou no SignIn Controller")
            const getUser = await authRepository.getUserByEmail(req.body.email);
            if(getUser && bcrypt.compareSync(req.body.password, getUser[0].password)){
                const token = uuid();

                const saveNewUserSession = await authRepository.saveUserSession(getUser[0].id, token);

                if(saveNewUserSession === 201){
                    return res.send({ token }).status(saveNewUserSession);
                }else{
                    return res.sendStatus(saveNewUserSession);
                }               
            }else{
                return res.sendStatus(401);
            }
        } catch (error) {
            
        }
    }
}

export default authorizationController;