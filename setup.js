//your code here
const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./database.db');
// const argv = process.argv.slice(2)

let queryPol = `CREATE TABLE IF NOT EXISTS Politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    party VARCHAR,
    location VARCHAR,
    grade_current INTEGER
)`

let queryVoters = `CREATE TABLE IF NOT EXISTS Voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR,
    last_name VARCHAR,
    gender VARCHAR,
    age INTERGER
)`

let queryVotes = `CREATE TABLE IF NOT EXISTS Votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER,
        FOREIGN KEY (voterId) REFERENCES Voter(id),
        FOREIGN KEY (politicianId) REFERENCES Politician(id)
)`

let query = `DROP TABLE Votes`

db.serialize(function() {
    db.run(`DROP TABLE IF EXISTS Politicians`)
    db.run(`DROP TABLE IF EXISTS Voters`)
    db.run(`DROP TABLE IF EXISTS Votes`)

    db.run(queryPol, function (err){
        if(!err) console.log(`Sucessfully added table Pol`)
        else console.log("err: " + err)
    })
    
    db.run(queryVoters, function (err){
        if(!err) console.log(`Sucessfully added table Voters`)
        else console.log("err: " + err)
    })
    
    db.run(queryVotes, function (err){
        if(!err) console.log(`Sucessfully added table Votes`)
        else console.log("err: " + err)
    })
})

db.close()