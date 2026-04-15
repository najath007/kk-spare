const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kk_spare_parts',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Only enable SSL if explicitly requested via DB_SSL=true env var
if (process.env.DB_SSL === 'true') {
  dbConfig.ssl = { rejectUnauthorized: false };
}

const pool = process.env.DATABASE_URL || process.env.DB_URI 
  ? mysql.createPool(process.env.DATABASE_URL || process.env.DB_URI)
  : mysql.createPool(dbConfig);

module.exports = pool;