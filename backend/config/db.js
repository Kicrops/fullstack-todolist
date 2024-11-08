const sqlite3 = require('sqlite3').verbose();

const connectDB = () => {
    const db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error('Error connecting to database:', err.message);
            process.exit(1);
        }
        console.log('Connected to the SQLite database.');
    });
};

module.exports = connectDB;
