const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

//Release 0

//Nomor 1
let votebellow9 = `
  SELECT name, location, grade_current,
  COUNT (votes.politicianId) AS totalVote
  FROM politicians JOIN votes
  ON politicians.politician_id = votes.politicianId
  WHERE grade_current <= 9 GROUP BY politicianId ORDER BY grade_current`
//
//Nomor 2
let bestVote1 = `
  CREATE VIEW IF NOT EXISTS BEST AS
  SELECT COUNT (votes.politicianId) AS totalVote, politicians.name, politician_id FROM votes
  JOIN politicians ON votes.politicianId = politicians.politician_id
  GROUP by politicianId ORDER BY totalVote DESC LIMIT 3`

let bestVote2 = `
  SELECT totalVote, name, voters.first_name ||" "|| voters.last_name AS votersName, voters.gender FROM votes
  JOIN BEST ON votes.politicianId = BEST.politician_id
  JOIN voters ON votes.voterId = voters.voter_id ORDER BY totalVote DESC`
//

//Nomor 3
// let fraudVoting = `
//   SELECT COUNT (votes.politicianId) AS totalVote, voters.first_name ||" "|| voters.last_name AS name, gender, age FROM voters
//   JOIN votes ON voters.voter_id = votes.voterId
//   GROUP BY voters.voter_id HAVING totalVote > 1 ORDER BY totalVote DESC `

  db.serialize(function() {
    // db.all(votebellow9, function(err, rows) {
    //   if (err) {
    //     throw err
    //   }
    //   console.log(rows);
    // })

  db.run(bestVote1, function(err) {
    if (err) {
      throw err
    }
  })

  db.all(bestVote2, function(err, rows) {
    if (err) {
      throw err
    }
    console.log(rows);
  })

  // db.all(fraudVoting, function(err, rows) {
  //   if (err) {
  //     throw err
  //   }
  //   console.log(rows);
  // })
})