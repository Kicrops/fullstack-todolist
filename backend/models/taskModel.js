const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');


db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date INTEGER,
            text TEXT,
            beingEdited BOOLEAN,
            completed BOOLEAN
        )
    `);
});

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM tasks', [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

exports.create = (text) => {
    const date = Date.now();
    const beingEdited = false;
    const completed = false;
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO tasks (date, text, beingEdited, completed) VALUES (?, ?, ?, ?)',
            [date, text, beingEdited, completed],
            function (err) {
                if (err) reject(err);
                resolve({ id: this.lastID, date, text, beingEdited, completed });
            }
        );
    });
};

exports.clear = () => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM tasks', function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
            if (err) reject(err);
            resolve();
        });
    });
};

exports.updateText = (id, text) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE tasks SET text = ? WHERE id = ?', [text, id], function (err) {
            if (err) reject(err);
            resolve({ id, text });
        });
    });
};

exports.updateCompleted = (id, completed) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], function (err) {
            if (err) reject(err);
            resolve({ id, completed });
        });
    });
};



