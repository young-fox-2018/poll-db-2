const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

//====================================== SOAL 1 =======================================================//
// let query = `SELECT name, location, grade_current, COUNT(voterId) AS totalVote
//             FROM Votes INNER JOIN Politicians ON Votes.politicianId = Politicians.id
//             WHERE grade_current < 9
//             GROUP BY name
//             ORDER BY totalVote ASC
//             `
// db.all(query3, function(err,data){
//     if(err){
//         console.log("Err:", err)
//     } else {
//         console.log(data)
//     }
// })

//======================================= SOAL 2 =====================================================//
// let query = `CREATE VIEW Elections AS
//             SELECT COUNT(voterId) AS totalVote, politicianId AS candidateId, name AS candidateName
//             FROM ((Votes 
//             INNER JOIN Politicians ON Votes.politicianId = Politicians.id)
//             INNER JOIN Voters ON Votes.voterId = Voters.id)
//             GROUP BY name
//             ORDER BY totalVote DESC
//             LIMIT 3
//             `
// db.run(query, function(err){
//     if(err){
//         console.log("Err:", err)
//     }
// }) 

// let query2 = `
//             SELECT totalVote, candidateName, (first_name||" "||last_name) AS voterName, gender
//             FROM ((Elections
//             INNER JOIN Votes ON Elections.candidateId = Votes.politicianId)
//             INNER JOIN Voters ON Votes.voterId = Voters.id)
//             ORDER BY totalVote DESC
//             `
// db.all(query2, function(err,data){
//     if(err){
//         console.log("Err:", err)
//     } else {
//         console.log(data)
//     }
// })



//======================================== SOAL 3 ====================================================//
// let query = `SELECT COUNT(voterId) AS totalVote, (first_name||" "||last_name) AS name, gender, age
//             FROM ((Votes 
//             INNER JOIN Politicians ON Votes.politicianId = Politicians.id)
//             INNER JOIN Voters ON Votes.voterId = Voters.id)
//             GROUP BY voterId
//             HAVING COUNT(voterId) > 1
//             `
// db.all(query3, function(err,data){
//     if(err){
//         console.log("Err:", err)
//     } else {
//         console.log(data)
//     }
// })
//==================================================================================================//

