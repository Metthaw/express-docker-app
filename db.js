require('dotenv').config();
const mysql = require('mysql2');

// เลือก host ตามสภาพแวดล้อม (Docker หรือ Local)
const dbHost = process.env.DOCKER_ENV === 'true' ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL;

const connection = mysql.createConnection({
    host: dbHost,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect(err => {
    if (err) {
        console.error(`❌ Database connection failed at ${dbHost}, retrying in 5 seconds...`);
        setTimeout(() => connection.connect(), 5000);
    } else {
        console.log(`✅ Connected to MySQL database at ${dbHost}`);
    }
});

module.exports = connection;
