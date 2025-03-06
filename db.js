require('dotenv').config(); // โหลดค่าจาก .env
const mysql = require('mysql2');

// เช็คว่าโค้ดกำลังรันอยู่ใน Docker หรือไม่
const isDocker = process.env.DOCKER_ENV === 'true';

// เลือก `DB_HOST` ตามสถานการณ์
const dbHost = isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL;

const config = {
    host: dbHost,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

let connection;

function connectWithRetry() {
    connection = mysql.createConnection(config);

    connection.connect(err => {
        if (err) {
            console.error(`❌ Database connection failed at ${dbHost}, retrying in 5 seconds...`);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log(`✅ Connected to MySQL database at ${dbHost}`);
        }
    });

    connection.on('error', err => {
        console.error('❌ MySQL connection lost, reconnecting...');
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectWithRetry();
        } else {
            throw err;
        }
    });
}

connectWithRetry();
module.exports = connection;
