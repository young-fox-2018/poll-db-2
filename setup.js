const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

function setupTable(){
    db.serialize(function(){
        db.run("DROP TABLE IF EXISTS Politicians")
        db.run("DROP TABLE IF EXISTS Voters")
        db.run("DROP TABLE IF EXISTS Votes")
        // name,party,location,grade_current
        let qCreateTablePolitician = `
            CREATE TABLE IF NOT EXISTS Politicians( 
            id INTEGER PRIMARY KEY AUTOINCREMENT ,
            name VARCHAR(30), 
            party VARCHAR(1),
            location VARCHAR(2), 
            grade_current FLOAT );`
    
        // first_name,last_name,gender,age
        let qCreateTableVoters = `
            CREATE TABLE IF NOT EXISTS Voters( 
            id INTEGER PRIMARY KEY AUTOINCREMENT ,
            first_name VARCHAR(10), 
            last_name VARCHAR(10), 
            gender VARCHAR(7), 
            age INTEGER);`
        
        let qCreateTableVotes = `
            CREATE TABLE if not exists Votes( 
            id INTEGER PRIMARY KEY AUTOINCREMENT  ,
            voterId INTEGER, 
            politicianId INTEGER, 
            FOREIGN KEY (politicianID) REFERENCES Politicians(id),
            FOREIGN KEY (voterID) REFERENCES Voters(id)
            );`
    
        db.run(qCreateTablePolitician, function(err){
            if(err){
                console.log("Err: ",err)
            } else {
                console.log("----Successfully created new table Politicians----")
            }
        })
    
        db.run(qCreateTableVoters, function(err){
            if(err){
                console.log("Err: ",err)
            } else {
                console.log("----Successfully created new table Voters----")
            }
        })
    
        db.run(qCreateTableVotes, function(err){
            if(err){
                console.log("Err: ",err)
            } else {
                console.log("----Successfully created new table Votes----")
            }
        })
    })
}

setupTable()
// module.exports = db