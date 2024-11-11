const sqlite3 = require('sqlite3').verbose();
let db;

const connectDB = () => {
    db = new sqlite3.Database('./db/database.db', (err) => {
        if (err) {
            console.error('Error connecting to database:', err.message);
            process.exit(1);
        }
        console.log('Connected to the SQLite database.');
    });
};

const closeDB = () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database connection:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
};

process.on('SIGINT', () => {
    closeDB();
    process.exit(0);
});

module.exports = { connectDB, closeDB };
