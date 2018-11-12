const db = require("./connectDB")
// CREATE all table that is necessary

let queryCreatePoliticians = `CREATE TABLE IF NOT EXISTS Politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current REAL
);`

let queryCreateVoters = `CREATE TABLE IF NOT EXISTS Voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
);`

let queryCreateConjunction = `CREATE TABLE IF NOT EXISTS Votes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            politician_id INTEGER,
            voter_id INTEGER,
            FOREIGN KEY (politician_id) REFERENCES Politicians (id),
            FOREIGN KEY (voter_id) REFERENCES Voters (id)            
)`
 
db.serialize(function() {
    db.run(`DROP TABLE IF EXISTS Votes`, function(err) {
        if (err)throw err;
        console.log('Successfully dropped Votes Table')
    })

    db.run(`DROP TABLE IF EXISTS Politicians`, function(err) {
        if (err)throw err;
        console.log('Successfully dropped Politicians Table')
    })

    db.run(`DROP TABLE IF EXISTS Voters`, function(err) {
        if (err)throw err;
        console.log('Successfully created Voters Table')
    })

    db.run(queryCreatePoliticians, function(err) {
        if (err)throw err;
        console.log('Successfully created Politicians Table')
    })

    db.run(queryCreateVoters, function(err) {
        if (err) throw err;
        console.log('Successfully created Voters Table')
    })

    db.run(queryCreateConjunction, function(err) {
        if (err) throw err;
        console.log('Successfully created Votes')
    })
})

db.close()