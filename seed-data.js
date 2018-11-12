const fs = require("fs")
const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const dataPolitician = fs.readFileSync('./politicians.csv','utf8').split("\n").slice(1)
const dataVoters = fs.readFileSync('./voters.csv','utf8').split("\n").slice(1)
const dataVotes = fs.readFileSync('./votes.csv','utf8').split("\n").slice(1)


function addPoliticians(){
    db.serialize(function(){
    for( let i = 0; i < dataPolitician.length; i++){
        let dataPoliticianSplit = dataPolitician[i].split(",")
        let qInsertTable = `INSERT INTO Politicians(name,party,location,grade_current) 
        VALUES ("${dataPoliticianSplit[0]}", "${dataPoliticianSplit[1]}", "${dataPoliticianSplit[2]}", "${dataPoliticianSplit[3]}")`
        
        db.run(qInsertTable, function(err){
            // if(err){
            //     console.log("Err:", err)
            // } 
            // else { console.log("Successfully insert data politician to table")}
        })
    }})
}

function addVoters(){
    db.serialize(function(){
    for( let i in dataVoters){
        let dataVotersSplit = dataVoters[i].split(",")
        let qInsertTable = `INSERT INTO Voters(first_name,last_name,gender,age) 
        VALUES ("${dataVotersSplit[0]}", "${dataVotersSplit[1]}", "${dataVotersSplit[2]}", "${dataVotersSplit[3]}")`
    
        db.run(qInsertTable, function(err){
            // if(err){
            //     console.log("Err:", err)
            // } 
            // else {console.log("Successfully insert data voters to table") }
        })
    }})
}

function addVotes(){
    db.serialize(function(){
    for( let i in dataVotes){
        let dataVotesSplit = dataVotes[i].split(",")
        let qInsertTable = `INSERT INTO Votes(voterId,politicianId) 
        VALUES ("${dataVotesSplit[0]}", "${dataVotesSplit[1]}")`
    
        db.run(qInsertTable, function(err){
            // if(err){
            //     console.log("Err:", err)
            // } 
            // else {console.log("Successfully insert data voters to table") }
        })
    }})
}

addPoliticians()
addVoters()
addVotes()


