import connection from "../db/postgres.js";

const urlsRepository = {
    saveShortenedUrl: async (userId, url, shortUrl) => {
        console.log(userId)
        const query = await connection.query('INSERT INTO "urls" (short_url, url, visit_count, user_id) VALUES ($1, $2, 0, $3)', [
            shortUrl,
            url,
            userId
        ])
        console.log(query)
    },
    updateLinksCount: async (userId, type) => {
        if(type === 'add'){
            const query = await connection.query('UPDATE "users" SET links_count = links_count + 1 WHERE id = $1', [userId])
        }else{
            const query = await connection.query('UPDATE "users" SET links_count = links_count - 1 WHERE id = $1', [userId])
        }  
    },
    getShortUrlByParam: async (searchParam, param) => {
        const { rows } = await connection.query(`SELECT id, "short_url" AS "shortUrl", url FROM "urls" WHERE ${searchParam} = $1`, [param]);
        return rows;
    },
    updateVisitCount: async (shortUrlId) => {
        await connection.query('UPDATE "urls" SET visit_count = visit_count + 1 WHERE id = $1', [shortUrlId]);
    },
    deleteShortUrl: async (shortUrlId, userId) => {
        const verifyIfIsUrlExists = await connection.query('SELECT * FROM "urls" WHERE id = $1', [shortUrlId]);
        
        const verifyIfIsFromUser = await connection.query('SELECT * FROM "urls" WHERE id = $1 AND user_id = $2', [shortUrlId, userId]);
        if(verifyIfIsUrlExists.rowCount > 0){
            if(verifyIfIsFromUser.rowCount > 0){
                const query = await connection.query('DELETE FROM "urls" WHERE id = $1 AND user_id = $2', [shortUrlId, userId]);
                return query;
            }else{
                return 401;
            }
        }else{
            return 404;
        }

    }
}

export default urlsRepository;