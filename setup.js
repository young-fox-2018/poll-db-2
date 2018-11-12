const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

let create_politicians_table = `
  CREATE TABLE politicians(
    politician_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30),
    party VARCHAR(30),
    location VARCHAR(3),
    grade_current FLOAT
  );
  `
let create_voters_table = `
  CREATE TABLE voters(
    voter_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    gender VARCHAR(10),
    age INTEGER
  );
  `
let create_votes_table = `
  CREATE TABLE votes(
    votes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER,
    FOREIGN KEY (voterId) REFERENCES voters(voter_id),
    FOREIGN KEY (politicianId) REFERENCES politicians(politician_id)
  );
  `

db.serialize(function() {
  db.run(create_politicians_table, function(err) {
    if (err) {
      throw err
    }
    console.log(`berhasil bikin tabel politicians`);
  })

  db.run(create_voters_table, function(err) {
    if (err) {
      throw err
    }
    console.log(`berhasil bikin tabel voters`);
  })

  db.run(create_votes_table, function(err) {
    if (err) {
      throw err
    }
    console.log(`berhasil bikin tabel votes`);
  })
})