const db = require('../Database/db')
class Model {
    static release1(cb) {
        db.all(`SELECT name, location, gradeCurrent, COUNT(*) AS totalVotes
                FROM Politicians a
                INNER JOIN Votes b
                ON a.id = b.politicianId
                WHERE a.gradeCurrent<9
                GROUP BY a.name
                ORDER BY a.gradeCurrent ASC`, function (err, data) {
                if (err) {
                    console.error(err.message)
                } else {
                    cb(data)
                }
            })
    }
    static release2(cb) {
        db.all(`SELECT totalVote, z.name, b.firstName||' '|| b.lastName AS voterName,
                 b.gender
                    FROM Votes a
                    INNER JOIN(
                    SELECT  COUNT(*) AS totalVote, politicianId 
                    FROM Votes
                    GROUP BY politicianId
                    ORDER BY totalVote DESC
                    LIMIT 3
                    ) x 
                    ON a.politicianId = x.politicianId
                        INNER JOIN Politicians z ON a.politicianId = z.id
                            INNER JOIN Voters b ON a.voterId = b.id
                                ORDER BY totalVote DESC`, function (err, data) {
                if (err) {
                    console.error(err.message)
                } else {
                    cb(data)
                }
            })
    }
    static release3(cb) {
        db.all(`SELECT COUNT (*) AS totalVote, Voters.firstName||' '||Voters.lastName AS name, gender, age
                FROM Voters
                INNER JOIN Votes
                ON Voters.id = Votes.voterId
                GROUP BY name
                HAVING totalVote > 1
                ORDER BY totalVote DESC`, function (err, data) {
                if (err) {
                    console.error(err.message)
                } else {
                    cb(data)
                }
            })
    }
}

module.exports = Model