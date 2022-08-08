import connection from "../db/postgres.js";

const usersRepository = {
    getUserData: async (userId) => {
        const checkUserLinkCount = await connection.query(`SELECT * FROM "users" WHERE "users".id = $1`, [userId]);
        const shortUrl = await connection.query(`SELECT "users".name, "urls".id, "urls".short_url, "urls".url, "urls".visit_count AS "visitCount" FROM "users" 
                                        JOIN "urls" 
                                        ON "users".id = "urls".user_id 
                                        WHERE "users".id = $1`, [userId]);
        console.log(shortUrl);

        const userData = shortUrl.rows;
        const {rows} = await connection.query('SELECT SUM("urls".visit_count) as "visitCount" FROM "urls" WHERE user_id = $1', [userId]);
        return {userData, rows};
    },
    rankUserData: async () => {
        const rank = await connection.query(`SELECT COALESCE(SUM("urls".visit_count),0) as "visitCount", "users".id,"users".name, "users".links_count  AS "linksCount" FROM "users" 
                                                LEFT JOIN "urls" 
                                                ON "users".id = "urls".user_id
                                                GROUP BY  "users".id,"users".name, "users".links_count
                                                ORDER BY "visitCount" DESC
                                                LIMIT 10 
                                            `)
        return rank.rows;
    },
    getSimpleUserData: async (userId) => {
        const userData = await connection.query(`SELECT "users".id, "users".name, "users".visit_count AS "visitCount" FROM "users" WHERE "users".id = $1`, [userId]);
        return userData.rows;
    }
}

export default usersRepository;