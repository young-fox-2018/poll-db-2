const db = require('./data/db')
const fs = require('fs')

let politicians = fs.readFileSync('./data/politicians.csv', 'utf8')
let voters = fs.readFileSync('./data/voters.csv', 'utf8')
let votes = fs.readFileSync('./data/votes.csv', 'utf8')


let headerPoliticians = politicians.split('\n')[0].split(',')
let headerVoters = voters.split('\n')[0].split(',')
let headerVotes = votes.split('\n')[0].split(',').slice(0,2)


db.run('drop table IF EXISTS politicians')
db.run('drop table IF EXISTS voters')
db.run('drop table IF EXISTS votes') 



let qCreatePolitician = 
`
CREATE TABLE IF NOT EXISTS politicians (
    id INTEGER not null primary key autoincrement,
    ${headerPoliticians[0]} varchar(100),
    ${headerPoliticians[1]} varchar,
    ${headerPoliticians[2]} varchar,
    ${headerPoliticians[3]} float
    )
    `
    
    let qCreateVoters = 
`
CREATE TABLE IF NOT EXISTS voters (
    id INTEGER not null primary key autoincrement,
    ${headerVoters[0]} varchar(30),
    ${headerVoters[1]} varchar(30),
    ${headerVoters[2]} varchar(10),
    ${headerVoters[3]} INTEGER
    )
`

let qCreateVotes = 
`
CREATE TABLE IF NOT EXISTS votes (
    id INTEGER not null primary key autoincrement,
    ${headerVotes[0]} INTEGER REFERENCES voters(id),
    ${headerVotes[1]} INTEGER REFERENCES politicians(id)
    )
`
// console.log(qCreatePolitician)
// console.log(qCreateVoters)
// console.log(qCreateVotes)


db.serialize(function() {
    db.run(qCreatePolitician, function(err){
        if (!err) {
            console.log('berhasil membuat table politicians')
        } else {
            console.log('err: ', err)
        }
    })

    db.run(qCreateVoters, function(err){
        if (!err) {
            console.log('berhasil membuat table voters')
        } else {
            console.log('err: ', err)
        }
    })

    db.run(qCreateVotes, function(err){
        if (!err) {
            console.log('berhasil membuat table votes')
        } else {
            console.log('err: ', err)
        }
    })

    
    
    // db.all("select name from sqlite_master where type='table'", function (err, tables) {
    //     console.log(tables);
    // });
})

db.close()