const db = require('./Database/db.js')

db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS Politicians(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            party TEXT NOT NULL,
            location TEXT NOT NULL,
            gradeCurrent REAL NOT NULL)`
    )
    db.run(`CREATE TABLE IF NOT EXISTS Voters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        gender TEXT NOT NULL,
        age INTEGER NOT NULL)`
    )
    db.run(`CREATE TABLE IF NOT EXISTS Votes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterId INTEGER,
            politicianId INTEGER,
            FOREIGN KEY (politicianId) REFERENCES Politicians(id)
            FOREIGN KEY (voterId) REFERENCES Voters(id))`
    )
})

db.close();

