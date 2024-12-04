import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    //host: 'mysql-container',
    host: 'api-db-mysql-1',
    port: 3306,
    database: 'tallermecanico_db',
    user: 'root',
    password: '1password',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})