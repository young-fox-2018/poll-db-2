
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

let query = ``

//NOMOR 3
let fraud = `SELECT (first_name ||" "|| last_name), gender, age COUNT(votes.votersId)
             AS totalVoters FROM votes 
             JOIN voters ON votes.votersId = voters.voters_id
             HAVING totalVotes > 1`;

db.all(fraud, function(err, data){
    console.log(data)
})