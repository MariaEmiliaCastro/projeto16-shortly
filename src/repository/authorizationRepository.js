import connection from "../db/postgres.js";

const authRepository = {
    getUserByEmail: async (email) => {
        const { rows } = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
        return rows;
    },
    insertNewUser: async (userData, senhaCriptografada) => {
        const query = await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [
            userData.name,
            userData.email,
            senhaCriptografada,
        ])

        if(query){
            return 201;
        }else{
            return 409;
        }
    }
}

export default authRepository;