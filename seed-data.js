const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data/data.db')
const fs = require('fs')

let politicians = fs.readFileSync('./data/politicians.csv', 'utf8').split('\n').slice(1)
let voters = fs.readFileSync('./data/voters.csv', 'utf8').split('\n').slice(1)
let votes = fs.readFileSync('./data/votes.csv', 'utf8').split('\n').slice(1)

db.serialize(function() {

    let qInsertPoliticians = db.prepare(`
    insert into politicians (name, party, location, grade_current)
    values 
    ((?), (?), (?), (?))
    `)

    for (let i = 0; i < politicians.length; i++) {
        let politiciansSplit = politicians[i].split(',')
        if (politiciansSplit.length >= 4) {
            // console.log(politiciansSplit[0])
            qInsertPoliticians.run(politiciansSplit[0], politiciansSplit[1], politiciansSplit[2], Number(politiciansSplit[3]))
        }
    }

    qInsertPoliticians.finalize(function(err) {
        if (!err) {
            console.log('berhasil insert data di table politicians')
        } else {
            console.log('err: ', err)
        }
    })


    db.each('select * from politicians', function(err, data){
        if (!err) {
            console.log(data)
        } else {
            console('err:', err)
        }
    })


    let qInsertVoters = db.prepare(
        `
        INSERT INTO voters 
        (first_name, last_name, gender, age)
        values 
        ((?), (?), (?), (?)) 
        `
    )

    for (let i = 0; i < voters.length; i++) {
        let votersSplit = voters[i].split(',')
        if (votersSplit.length >= 4) {
            // console.log(votersSplit)
            qInsertVoters.run(votersSplit[0], votersSplit[1], votersSplit[2], Number(votersSplit[3]))
        }
    }

    qInsertVoters.finalize(function(err) {
        if (!err) {
            console.log('berhasil insert data pada table voters')
        } else {
            console.log('err:', err)
        }
    })

    db.each('select * from voters', function(err, data){
        if (!err) {
            console.log(data)
        } else {
            console('err:', err)
        }
    })

    let qInsertVotes = db.prepare(
        `
        INSERT INTO VOTES 
        (voterId, politicianId)
        values
        ((?), (?))
        `
    )

    for (let i = 0; i < votes.length; i++) {
        let votesSplit = votes[i].split(',')
        if (votesSplit.length >= 2) {
            qInsertVotes.run(Number(votesSplit[0]), Number(votesSplit[1]))
        }
    }

    qInsertVotes.finalize(function(err) {
        if (!err) {
            console.log('berhasil insert data ke table votes')
        } else {
            console.log('err:', err)
        }
    })

    db.each('select * from votes', function(err, data){
        if (!err) {
            console.log(data)
        } else {
            console('err:', err)
        }
    })

    
})

