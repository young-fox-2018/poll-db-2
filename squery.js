const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

db.serialize(function() {

    let soalSatu =
    `
    SELECT name, location, grade_current, COUNT(*) AS totalVote
    FROM politicians
    INNER JOIN votes
        ON politicians.id = votes.politicians_id
    GROUP BY name
    ORDER BY grade_current
    LIMIT 3
    `
    db.all(soalSatu, function(err, data) {
        if(err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })

    let viewTemp =
    `
    CREATE VIEW win AS
    SELECT id, name, COUNT(*) AS totalVote
    FROM politicians
    INNER JOIN votes
        ON politicians.id = votes.politicians_id
    GROUP BY name
    ORDER BY totalVote DESC
    LIMIT 3
    `

    let soalDua = 
    `
    SELECT totalVote, name, first_name || ' ' || last_name AS voterName, gender
    FROM win
    INNER JOIN votes
        ON win.id = votes.politicians_id
    LEFT JOIN voters
        ON votes.voters_id = voters.id
    `

    db.all(soalDua, function(err, data) {
        if(err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })

    let soalTiga = 
    `
    SELECT COUNT(*) AS totalVote, first_name || ' ' || last_name AS name, gender, age
    FROM voters
    INNER JOIN votes
        ON voters.id = votes.voters_id
    GROUP BY id
        HAVING totalVote > 1
    ORDER BY COUNT(*) DESC
    `
    db.all(soalTiga, function(err, data) {
        if(err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })

});