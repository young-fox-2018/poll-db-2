const fs = require('fs')
const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');
const dataPathPoliticians = './politicians.csv'
const dataPathVoters = './voters.csv'
const dataPathVotes = './votes.csv'

let dataPoliticians = fs.readFileSync(dataPathPoliticians, 'utf8').toString().split("\n")
let dataVoters = fs.readFileSync(dataPathVoters, 'utf8').toString().split("\n")
let dataVotes = fs.readFileSync(dataPathVotes, 'utf8').toString().split("\n")


db.serialize(function() {
  for (let i = 1; i < dataPoliticians.length; i++) {
    let data = dataPoliticians[i].split(',')
    let insertPoliticians =
    `INSERT INTO politicians (name,party,location,grade_current)
     VALUES (
      "${data[0]}",
      "${data[1]}",
      "${data[2]}",
      "${data[3]}");`
    db.run(insertPoliticians, function(err) {
      if (err) {
        throw err
      }
      console.log(`berhasil input data politicians`);
    })
  }

  for (let i = 1; i < dataVoters.length; i++) {
    let data = dataVoters[i].split(',')
    let insertVoters =
    `INSERT INTO voters (first_name,last_name,gender,age)
     VALUES (
      "${data[0]}",
      "${data[1]}",
      "${data[2]}",
      "${data[3]}");`
    db.run(insertVoters, function(err) {
      if (err) {
        throw err
      }
      console.log(`berhasil input data voters`);
    })
  }

  for (let i = 1; i < dataVotes.length; i++) {
    let data = dataVotes[i].split(',')
    let insertVotes =
    `INSERT INTO votes (voterId,politicianId)
     VALUES (
      "${data[0]}",
      "${data[1]}");`
    db.run(insertVotes, function(err) {
      if (err) {
        throw err
      }
      console.log(`berhasil input data votes`);
    })
  }
})