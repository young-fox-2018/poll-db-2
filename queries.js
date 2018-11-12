const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');


// no 1.
let soal1 = `
SELECT name, location, grade_current
FROM politicians
WHERE grade_current < 9
ORDER BY grade_current ASC`
// db.all(soal1, function(err, rows) {
//     if (err) {
//         console.log('err');
//     } else {
//         console.log(rows);
//     }
// })

// no 2.
let soal2 =`
SELECT totalVote, name AS politicianName, (first_name || ' ' || last_name) AS voterName, gender 
FROM(
    SELECT COUNT(politicianId) AS totalVote, name, politicians.id
    FROM votes
    INNER JOIN politicians ON votes.politicianId = politicians.id
    GROUP BY name
    ORDER BY totalVote DESC
    LIMIT 3) AS top3
JOIN votes ON votes.politicianId = top3.id
JOIN voters ON votes.voterId = voters.id
ORDER BY totalVote DESC, politicianName;`
// db.all(soal2, function(err, rows) {
//     if (err) {
//         console.log('err');
//     } else {
//         console.log(rows);
//     }
// })

// soal 3
let soal3 = `
SELECT COUNT(voterId) AS totalVote, (first_name || " " || last_name) AS name, gender, age
FROM votes
JOIN voters ON votes.voterId = voters.id
GROUP BY name
HAVING totalVote > 1
ORDER BY totalVote DESC;`
db.all(soal3, function(err, rows) {
    if (err) {
        console.log('err');
    } else {
        console.log(rows);
    }
})