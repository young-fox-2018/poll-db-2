
const db = require("./databases.js");

//NOMOR 1
let grade = `SELECT name, location, grade_current FROM politicians
             WHERE grade_current <= 9
             ORDER BY grade_current`

db.all(grade, function(err, gradeData){
    if(err) throw err
    // console.log(gradeData)
})

//NOMOR 2

let query = ` SELECT totalVote, name AS politicianName, (first_name || ' ' || last_name) AS voterName, gender 
              FROM(
                SELECT COUNT(politiciansId) AS totalVote, name, politicians.politicians_id
                FROM votes
                INNER JOIN politicians ON votes.politiciansId = politicians.politicians_id
                GROUP BY name
                ORDER BY totalVote DESC
                LIMIT 3)`
db.all(query, function(err, dataQuery) {
    if(err) throw err
    console.log(dataQuery)
})

//NOMOR 3
let fraud = `SELECT (first_name ||" "|| last_name), gender, age COUNT(votes.votersId)
             AS totalVoters FROM votes 
             JOIN voters ON votes.votersId = voters.voters_id
             HAVING totalVotes > 1`;

// db.all(fraud, function(err, data){
//     if(err) throw err
//     console.log(data)
// })