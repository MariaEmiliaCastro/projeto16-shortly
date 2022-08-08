import connection from "../db/postgres.js";
import authRepository from "../repository/authorizationRepository.js";
import usersRepository from "../repository/usersRepository.js";

const usersController = {
    getUserData: async (req, res) => {
        try {
            const authToken = await authRepository.searchAuthorizeToken(res.locals.token);

            if(authToken.length > 0){
                const userUrls = await usersRepository.getUserData(authToken[0].user_id);
                const userData = {
                    id: authToken[0].user_id,
                    name: userUrls.shortUrl.rows[0].name,
                    visitCount: userUrls.rows[0].visitCount,
                    shortenedUrls: userUrls.shortUrl.rows.map(({name, ...keepAttrs}) => keepAttrs)
                }
                
                res.send(userData).status(200);
            }else{
                return res.sendStatus(404);
            }           
        } catch (error) {
            console.log(error)
            res.send(error).status(500);
        }

    },
    rankUsers: async (req, res) => {
        try {
            const rank = await usersRepository.rankUserData();
            res.send(rank).status(200);
        } catch (error) {
            console.log(error)
            res.send(error).status(500);   
        }
    }
}

export default usersController;