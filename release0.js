const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./voterDatabase.db")

const query1 = `SELECT politicians.name, politicians.location, politicians.grade_current, COUNT(votes.politicianId) AS totalVote
                FROM politicians
                INNER JOIN votes ON votes.politicianId = politicians.politicianId
                WHERE politicians.grade_current < 9
                GROUP BY votes.politicianId
                ORDER BY politicians.grade_current ASC;
                `

db.all(query1,function(err,data){
    if(err){
        console.log("ERR query1: ", err)
    }
    else{
        console.log(data)
        console.log("=====================================")
    }
})

const query2 = `
                SELECT numVotes,
                polName,
                voters.first_name ||" "|| voters.last_name AS voterName,
                voters.gender AS gender
                FROM 
                    (
                        SELECT COUNT(votes.politicianId) AS numVotes,
                        politicians.name AS polName,
                        politicians.politicianId AS polId
                        FROM votes
                        INNER JOIN politicians ON politicians.politicianId = votes.politicianId
                        GROUP BY politicians.name
                        ORDER BY numVotes DESC
                        LIMIT 3
                     ) AS tmpTable
                INNER JOIN votes ON votes.politicianId = tmpTable.polId 
                INNER JOIN voters ON voters.voterId = votes.voterId
                ORDER BY numVotes DESC, polName ASC;
                `
db.all(query2,function(err,data2){
    if(err){
        console.log("ERR query2: ", err)
    }
    else{
        console.log(data2)
        console.log("=====================================")
    }
})

const query3 = `
                SELECT count(voters.voterId) AS totalVote,
                voters.first_name ||" "|| voters.last_name AS name,
                voters.gender AS gender,
                voters.age AS age
                FROM (
                        SELECT votes.voterId AS voterVotes
                        FROM votes
                        INNER JOIN voters ON voters.voterId = votes.voterId
                     ) AS tmpTable
                JOIN voters ON voters.voterId = tmpTable.voterVotes
                GROUP BY voters.voterId
                ORDER BY totalVote DESC;
                `

db.all(query3,function(err,data3){
    if(err){
        console.log("ERR query3: ", err)
    }
    else{
        console.log(data3)
        console.log("=====================================")
    }
})