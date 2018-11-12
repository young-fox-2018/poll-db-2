
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./poll-2.db");

db.serialize(function(){
    let voters = `CREATE TABLE voters (
        voters_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        gender VARCHAR(6),
        age INTEGER 
    );`
    db.run(voters, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Success creating a table for voters!");
        }
    })

    let politicians = `CREATE TABLE politicians (
        politicians_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100),
        party VARCHAR(10),
        location VARCHAR(10),
        grade_current FLOAT
    );`

    db.run(politicians, function(err){
        if(err) {
            console.log(err)
        } else {
            console.log("Success creating a table for politicians");
        }
    })

    let politicians_voters = `CREATE TABLE votes (
        votersId INTEGER,
        politiciansId INTEGER,
            FOREIGN KEY (votersId) REFERENCES voters(voters_id),
            FOREIGN KEY (politiciansId) REFERENCES politicians(politicians_id)

    );`

    db.run(politicians_voters, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Success creating table for polls")
        }
    })
})