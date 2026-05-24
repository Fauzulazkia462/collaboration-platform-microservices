const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function initDb() {
    const sql = fs.readFileSync(
        path.join(__dirname, '../db/init.sql'),
        'utf8'
    );

    await pool.query(sql);

    console.log("Database initialized");
}

module.exports = initDb;