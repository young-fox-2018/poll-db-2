"use strict"

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')
const fs = require('fs')
const argv = process.argv.slice(2)
const command = argv[0]

switch(command) {
    case 'create':
        database()
        break;
    case 'addVoter':
        let voter = [{
            firstName: argv[1],
            lastName: argv[2],
            gender : argv[3],
            age: argv[4]
        }]

        insertVoterData(voter)
    break;
    case 'addVote':
        let vote= [{
            votesID: argv[1],
            politicianID: argv[2]
        }]

        insertVoteData(vote)
    break
    case 'addPolitician':
    let politician = [{
        name: argv[1],
        party: argv[2],
        location: argv[3],
        currentGrade: argv[4]
    }]

    insertPoliticianData(politician)
    break;
    case 'updateVoter':
    let updateVoter = [{
        field: argv[1],
        value: argv[2],
        id: argv[3]
    }]

    updateVoterData(updateVoter)
break;
case 'updateVote':
    let updateVote= [{
        votesID: argv[1],
        politicianID: argv[2]
    }]

    insertVoteData(updateVote)
break
case 'deleteVoter':
    deleteVoterData(argv[1])
break
case 'getGrade': 
    getGradeLessThanNine()
break
case 'getMostVote':
    getMostVote()
break
case 'getAllFraud':
    getAllFraud()
break
}

function database() {
    console.log('masuk  ga')
    db.run('DROP TABLE  IF EXISTS voters')
    db.run('DROP TABLE  IF EXISTS votes')
    db.run('DROP TABLE IF EXISTS politicians')

    db.serialize(() => {
        let votersCreateQuery = `
            CREATE TABLE IF NOT EXISTS voters (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                firstName VARCHAR(100),
                lastName VARCHAR(100),
                gender VARCHAR(10),
                age INTEGER
            )`

        db.run(votersCreateQuery, err => {
            if (err) {
                console.log('Error: ', err)
            } else {
                console.log('Voter table successfully created')
            }
        })

        let politiciansCreateQuery = `
            CREATE TABLE IF NOT EXISTS politicians (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100),
                party VARCHAR(100),
                location VARCHAR(80),
                currentGrade INTEGER
        )`

        db.run(politiciansCreateQuery, err => {
            if (err) {
                console.log('Error: ', err)
            } else {
                console.log('Offcial table successfully created')
            }
        })

        let votesCreateQuery = `
        CREATE TABLE IF NOT EXISTS votes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterID INTEGER,
            politicianID INTEGER,
            FOREIGN KEY(voterID) REFERENCES voters(id),
            FOREIGN KEY(politicianID) REFERENCES officials(id)
        )`

        db.run(votesCreateQuery, err => {
            if (err) {
                console.log('Error: ', err)
            } else {
                console.log('Votes table successfully created')
            }
        })

        readData('./voters.csv', (err , data) => {
            if (err) {
                console.log(err)
            } else {
                data.forEach(element => {
                    element = element.split(',')
                    let voterInsertQuery =`
                            INSERT INTO voters(firstName, lastName, gender, age)
                                VALUES("${element[0]}", "${element[1]}", "${element[2]}", ${element[3]})`
                    
                    db.exec(voterInsertQuery, err => {
                        if (err) {
                            //console.log(err)
                        }
                    })
                })
            }
        })

        readData('./votes.csv', (err , data) => {
            if (err) {
                console.log(err)
            } else {
                data.forEach(element => {
                    element = element.split(',')
                    let voterInsertQuery =`
                            INSERT INTO votes(voterID, politicianID)
                                VALUES(${element[0]}, ${element[1]})`
                    
                    db.exec(voterInsertQuery, err => {
                        if (err) {
                            //console.log(err)
                        }
                    })
                })
            }
        })

        readData('./politicians.csv', (err , data) => {
            if (err) {
                console.log(err)
            } else {
                data.forEach(element => {
                    element = element.split(',')
                    let voterInsertQuery =`
                            INSERT INTO politicians(name, party, location, currentGrade)
                                VALUES("${element[0]}", "${element[1]}", "${element[2]}", ${element[3]})`
                    
                    db.exec(voterInsertQuery, err => {
                        if (err) {
                            console.log(err)
                        }
                    })
                })
            }
        })
    })
}

function readData(file, cb) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {   
            cb(err)
        } else {
            data = data.split('\n')
            data = data.slice(1)
            cb(null, data)
        }
    })
} 

function insertVoterData(data) {
    let stmt = db.prepare(`INSERT INTO voters(firstName, lastName, gender, age) VALUES(? ,? ,?, ?)`)
    
    for (let i = 0; i < data.length; i++) {
        stmt.run(data[i].firstName, data[i].lastName, data[i].gender, data[i].age, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('Voter Data succesfully added')
            }
        })
    }
}

function insertPoliticianData(data) {
    let stmt = db.prepare(`INSERT INTO politicians(name, party, location, currentGrade) VALUES(?, ? ,? , ?)`)
    
    db.serialize(() => {
        for (let i = 0; i < data.length; i++) {
            stmt.run(data[i].name, data[i].party, data[i].location, data[i].currentGrade, err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Politician Data succesfully added')
                }
            })
        }
    })
}

function insertVoteData(data) {
    let stmt = db.prepare(`INSERT INTO voters(firstName, lastName, gender, age) VALUES(? ,? ,?, ?)`)
    
    db.serialize(() => {
    for (let i = 0; i < data.length; i++) {
        stmt.run(data[i].firstName, data[i].lastName, data[i].gender, data[i].age)
    }
    })
}

function updateVoterData(data) {
    let stmt = db.prepare(`UPDATE voters
                            SET ${data[0].field} = ?
                            WHERE id = ?`)

    stmt.run(data[0].value, data[0].id)
}

function deleteVoterData(id) {
    let stmt = db.prepare(`DELETE FROM voters
                            WHERE id = ?`)

    stmt.run(id)
}

function getGradeLessThanNine() {
    let getQuery = `SELECT name, location, currentGrade , COUNT(votes.politicianID) as totalVote
                        FROM politicians
                        JOIN votes
                        ON politicians.id = votes.politicianID
                        WHERE currentGrade < 9
                        GROUP by votes.politicianID
                        ORDER BY 4;`

    db.all(getQuery, (err, rows) => {
        if (err) {
            console.log('adsad')
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

function getMostVote() {
    let getQuery = `SELECT totalVotes, politicianName, voters.firstName || " " || voters.lastName as voterName, voters.gender as gender
                    FROM
                    (
                        SELECT COUNT(votes.politicianID) as totalVotes, politicians.id as id, politicians.name as politicianName
                        FROM politicians
                        JOIN votes
                        ON politicians.id = votes.politicianID
                        GROUP BY votes.politicianID
                        ORDER BY totalVotes DESC
                        LIMIT 3
                    ) AS tempTable
                    JOIN votes
                    ON tempTable.id = votes.politicianID
                    JOIN voters
                    ON voters.id = votes.voterID
                    ORDER BY totalVotes DESC, votes.politicianID ASC`
    
    db.all(getQuery, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
}

function getAllFraud() {
    let getQuery = `SELECT totalVote, tempTable.name, gender, age FROM
                    (
                        SELECT COUNT(votes.voterID) as totalVote, voters.firstName || " " || voters.lastName as name, voters.gender as gender, voters.age as age
                        FROM voters
                        JOIN votes
                        ON voters.id = votes.voterID
                        GROUP BY votes.voterID
                        ORDER BY 1 DESC
                    ) as tempTable
                    WHERE totalVote > 1`
    
    db.all(getQuery, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })

}


