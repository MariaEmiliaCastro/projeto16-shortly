import { nanoid } from 'nanoid';
import authRepository from "../repository/authorizationRepository.js";
import urlsRepository from '../repository/urlsRepository.js';

const urlsController = {
    shortenUrl: async (req, res) => {
        try {
            const authToken = await authRepository.searchAuthorizeToken(res.locals.token)
            
            if(authToken){
                const shortUrl = nanoid();
                console.log(authToken);
                console.log("Short url generated: ", shortUrl);

                await urlsRepository.saveShortenedUrl(authToken[0].user_id, req.body.url, shortUrl);
                await urlsRepository.updateLinksCount(authToken[0].user_id);

                return res.send(shortUrl).status(201); 
            }else{
                return res.sendStatus(401) 
            }

               
        } catch (error) {
            res.send(error).status(500);
        }
    },
    getShortUrlById: async (req, res) => {
        try {
            const checkType = /^\d*$/.test(req.params.id);
            if(checkType){
                const shortUrl = await urlsRepository.getShortUrlByParam("id", req.params.id);
                console.log(shortUrl[0]);
    
                if(shortUrl.length > 0){
                    return res.send(shortUrl[0]).status(200);
                }else{
                    return res.sendStatus(404)
                }
            }else{
                const shortUrl = await urlsRepository.getShortUrlByParam("short_url", req.params.id);
                console.log(shortUrl[0]);
    
                if(shortUrl.length > 0){
                    await urlsRepository.updateVisitCount(shortUrl[0].id);
                    return res.redirect(shortUrl[0].url);
                }else{
                    return res.sendStatus(404)
                }
            }

        } catch (error) {
            res.sendStatus(500);
        }
    },
    redirectToUrl: async (req, res) => {
        try {
            const shortUrl = await urlsRepository.getShortUrlByParam("short_url", req.params.shortUrl);
            console.log(shortUrl[0]);

            if(shortUrl.length > 0){
                return res.redirect(shortUrl[0].url);
            }else{
                return res.sendStatus(404)
            }
        } catch (error) {
            res.send(error).status(500);
        }
    },
    deleteShortUrl: async (req, res) => {
        try {
            const authToken = await authRepository.searchAuthorizeToken(res.locals.token)
            const deleteUrlResult = await urlsRepository.deleteShortUrl(req.params.id, authToken[0].user_id)
            console.log(deleteUrlResult);
            if(deleteUrlResult.rowCount === 0){
                return res.sendStatus(404);
            }
            res.sendStatus(204);
        } catch (error) {
            res.send(error).status(500);
        }
    }
}

export default urlsController;