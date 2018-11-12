//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

db.serialize(function() {
    db.run('DROP TABLE IF EXISTS voters;');
    db.run('DROP TABLE IF EXISTS politicians;');
    db.run('DROP TABLE IF EXISTS votes;');

    const createTableVoters = `CREATE TABLE IF NOT EXISTS voters 
                    (
                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        first_name VARCHAR(10), 
                        last_name VARCHAR(15), 
                        gender VARCHAR(6), 
                        age INTEGER
                    )`;
    db.run(createTableVoters, function(err) {
        if(err) {
            console.log(`Error create table voters, `, err);
        } else {
            console.log(`Table Voters successfully created!`);
        }
    });

    const createTablePoliticians = `CREATE TABLE IF NOT EXISTS politicians 
                    (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(30),
                        party VARCHAR(5),
                        location VARCHAR(5),
                        grade_current REAL
                    )`;
    db.run(createTablePoliticians, function(err) {
        if(err) {
            console.log(`Error create table politicians, `, err);
        } else {
            console.log(`Table Politicians successfully created!`);
        }
    });

    const createTableVotes = `CREATE TABLE IF NOT EXISTS votes 
                    (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        voterId INTEGER,
                        politicianId INTEGER,
                            FOREIGN KEY (voterId) REFERENCES voters(id),
                            FOREIGN KEY (politicianId) REFERENCES politicians(id)
                    )`;

    db.run(createTableVotes, function(err) {
        if (err) {
            console.log(`Error create table votes, `, err);
        } else {
            console.log(`Table Votes successfully created!`);
        }
    })
});