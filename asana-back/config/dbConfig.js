const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT || 3306, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}


async function query(sql, params) {
    const connection = await mysql.createConnection(config);
    const [results,] = await connection.execute(sql, params);

    return results;
}

module.exports = {query};
