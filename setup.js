const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('./poll.db')


const qvoters = `
  CREATE TABLE IF NOT EXISTS voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR,
    last_name VARCHAR,
    gender VARCHAR,
    age INTEGER
  )
`

const qcandi = `
  CREATE TABLE IF NOT EXISTS candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    party VARCHAR,
    location VARCHAR,
    grade_current REAL
  )
`

const qpoll = `
    CREATE TABLE IF NOT EXISTS polls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      voter_id INTEGER,
      candidate_id INTEGER,
      FOREIGN KEY(voter_id) REFERENCES voters(id),
      FOREIGN KEY(candidate_id) REFERENCES candidates(id)
    )
`
db.serialize(function(){
  db.run(qvoters, function(err){
    if(!err) {
      console.log(`Berhasil memasukkan data voters.`)
    } else {
      console.log(`ERR :` , err)
    }
  })

  db.run(qcandi, function(err){
    if(!err) {
      console.log(`Berhasil memasukkan data candidates.`)
    } else {
      console.log(`ERR :` , err)
    }
  })

  db.run(qpoll, function(err){
    if(!err) {
      console.log(`Berhasil memasukkan data poll.`)
    } else {
      console.log(`ERR :` , err)
    }
  })
})

module.exports = db