const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./database.db');

//NO 1
let query1 = `SELECT nama_pejabat, location, grade_current, COUNT(Voting.id_pejabat) AS TotalVote 
FROM Candidate JOIN Voting ON Candidate.id = Voting.id_pejabat WHERE grade_current <= 9
 GROUP BY Voting.id_pejabat
 ORDER BY Candidate.grade_current ASC`

 //NO 2 SAMA VIEW NYA
let CANDIDATE_VIEW = `CREATE VIEW IF NOT EXISTS CANDIDATE_VIEW AS
SELECT nama_pejabat AS PoliticianName,COUNT(Voting.id_pejabat) AS TotalVotes, Candidate.id 
FROM Candidate JOIN Voting ON Candidate.Id = Voting.id_pejabat 
GROUP BY Candidate.Id
ORDER BY TotalVotes DESC LIMIT 3`

//RUN VIEW!
// db.run(CANDIDATE_VIEW, function(err) {
//     if (err) {
//         throw err
//     }
// })

let query2 = `SELECT TotalVotes, PoliticianName, first_name, gender FROM Voting JOIN CANDIDATE_VIEW ON Voting.id_pejabat = CANDIDATE_VIEW.Id
JOIN Voters ON Voting.id_voters = Voters.Id ORDER BY TotalVotes DESC`


//NO 3
let query3 = `SELECT Voters.first_name||' '||Voters.last_name, gender, age, COUNT(Voting.id_pejabat) AS TotalVotes
FROM Voters JOIN Voting ON Voters.Id = Voting.id_voters
GROUP BY Voters.id 
HAVING TotalVotes > 1
ORDER BY TotalVotes DESC`



db.all(query2, function (err, rows) {
    if (err) {
        throw err
    }

    console.log(rows);
    
})

