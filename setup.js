const fs = require('fs')
const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./data.db');

const qCreateVoters = `CREATE TABLE Voters(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR,    
                last_name VARCHAR,     
                gender VARCHAR(10),
                age INT
                );`
const qCreateCandidates = `CREATE TABLE Candidates(
                id INTEGER   PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(50),    
                party  VARCHAR(50),    
                location VARCHAR(50),
                grade_current  INT
                );`

const qCreateVotes = `CREATE TABLE Votes(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_voters INT,
                id_candidates INT,
                FOREIGN KEY(id_voters) REFERENCES Voters(id),
                FOREIGN KEY(id_candidates) REFERENCES Candidates(id)
                );`

db.serialize(function(){
    db.run("DROP TABLE IF EXISTS Voters;")
    db.run("DROP TABLE IF EXISTS Candidates;")
    db.run("DROP TABLE IF EXISTS Votes;")
    db.run(qCreateVoters, function (err) {
        if (err) throw err;
        console.log('Successfully created table Voters!');
        });
    db.run(qCreateCandidates, function (err) {
        if (err) throw err;
        console.log('Successfully created table Candidates!');
        });
    db.run(qCreateVotes, function (err) {
        if (err) throw err;
        console.log('Successfully created table Votes!');
        });

})



module.exports = db;
