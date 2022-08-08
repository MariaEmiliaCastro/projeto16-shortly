import connection from "../db/postgres.js";

const usersRepository = {
    getUserData: async (userId) => {
        const shortUrl = await connection.query(`SELECT "users".name, "urls".id, "urls".short_url, "urls".url, "urls".visit_count AS "visitCount" FROM "users" 
                                        JOIN "urls" 
                                        ON "users".id = "urls".user_id 
                                        WHERE "users".id = $1`, [userId]);

        const {rows} = await connection.query('SELECT SUM("urls".visit_count) as "visitCount" FROM "urls" WHERE user_id = $1', [userId]);
        return {shortUrl, rows};
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
    }
}

export default usersRepository;