const fs = require('fs')
const { db } = require('./setup')

class Model {
    static readData(path, callback) {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) callback(err, null)
            else {
                callback(null, data.split('\n'))
            }
        })
    }

    static seedDataPoliticians(callback) {
        Model.readData('./politicians.csv', function (err, data) {
            if (err) callback(err, null)
            else {
                db.serialize(function () {
                    for (let i = 1; i < data.length; i++) {
                        let splitted = data[i].split(',')
                        db.run(`INSERT INTO politicians (name, party, location, grade_current)
                                VALUES ("${splitted[0]}", "${splitted[1]}", "${splitted[2]}", "${splitted[3]}")`,
                            function (err) {
                                if (err) callback(err)
                            })
                    }
                    callback(null)
                })
            }
        })
    }

    static seedDataVoters(callback) {
        Model.readData('./voters.csv', function (err, data) {
            if (err) callback(err, null)
            else {
                db.serialize(function () {
                    for (let i = 1; i < data.length; i++) {
                        let splitted = data[i].split(',')
                        db.run(`INSERT INTO voters (first_name, last_name, gender, age)
                                VALUES ("${splitted[0]}", "${splitted[1]}", "${splitted[2]}", "${splitted[3]}")`,
                            function (err) {
                                if (err) callback(err)
                            })
                    }
                    callback(null)
                })
            }
        })
    }

    static seedDataVotes(callback) {
        Model.readData('./votes.csv', function (err, data) {
            if (err) callback(err, null)
            else {
                db.serialize(function () {
                    for (let i = 1; i < data.length; i++) {
                        let splitted = data[i].split(',')
                        db.run(`INSERT INTO votes (voterId, politicianId)
                                VALUES ("${splitted[0]}", "${splitted[1]}")`,
                            function (err) {
                                if (err) callback(err)
                            })
                    }
                    callback(null)
                })
            }
        })
    }

    static gradeBelow(grade, callback) {
        db.all(`SELECT name, party, location,
                COUNT(*)
                AS totalVote
                FROM politicians
                INNER JOIN votes
                ON politicians.id = votes.politicianId
                WHERE grade_current < ${grade}
                GROUP BY politicians.name
                ORDER BY grade_current`,
            function(err, data) {
                if (err) callback(err)
                else callback(data)
            })
    }

    static createViewVoters(callback) {
        db.run(`CREATE VIEW votersPoliticianId AS
                SELECT voters.id, first_name|| ' ' || last_name as name, gender, votes.politicianId
                FROM voters
                INNER JOIN votes
                ON voters.id = votes.voterId`,
            function (err) {
                if (err) callback(err)
                else callback(null)
            })
    }

    static createViewPoliticians(callback) {
        db.run(`CREATE VIEW bestThreePoliticians AS
                SELECT politicians.id, name, count(*) 
                AS totalVote 
                FROM politicians
                INNER JOIN votes ON politicians.id = votes.politicianId
                GROUP BY name
                ORDER BY totalVote DESC
                LIMIT 3`,
            function(err) {
                if (err) callback(err)
                else callback(null)
            })
    }

    static bestThreePoliticians(callback) {
        db.all(`SELECT bestThreePoliticians.totalVote AS totalVote,
                bestThreePoliticians.name AS politicianName,
                votersPoliticianId.name AS voterName,
                votersPoliticianId.gender AS gender
                FROM bestThreePoliticians
                INNER JOIN votersPoliticianId
                ON bestThreePoliticians.id = votersPoliticianId.politicianId
                ORDER BY totalVote DESC`,
            function(err, data) {
                if (err) callback(err)
                else callback(data)
            })
    }

    static cheaters(callback) {
        db.all(`SELECT * FROM (SELECT COUNT(*) AS totalVote,
                first_name || ' ' || last_name AS name, gender, age
                FROM voters
                INNER JOIN votes
                ON voters.id = votes.voterId
                GROUP BY voterId
                ORDER BY totalVote DESC)
                WHERE totalVote > 1`,
            function(err, data) {
                if (err) callback(err)
                else callback(data)
            })
    } 
}

module.exports = Model