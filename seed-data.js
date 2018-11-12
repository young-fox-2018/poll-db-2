const fs = require('fs')
const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./data.db');


//INSERT ALL DATA IN VOTERS.CSV, POLITICIANS.CSV, VOTES.CSV
function seedData(){
    
    db.serialize(function(){
        const dataCandidates = fs.readFileSync('./politicians.csv', 'utf-8').split('\n')
        const dataVoters = fs.readFileSync('./voters.csv', 'utf-8').split('\n')
        const dataVotes = fs.readFileSync('./votes.csv', 'utf-8').split('\n')

        for (let i = 1; i < dataCandidates.length; i++) {
            let record = dataCandidates[i].split(',')
            let query = `INSERT INTO Candidates (name, party, location, grade_current)
                       VALUES ("${record[0]}", "${record[1]}", "${record[2]}", "${record[3]}")`;
            db.run(query, function (err) {
                if (err) throw err;
            });
        }
        
        for (let i = 1; i < dataVoters.length; i++) {
            let record = dataVoters[i].split(',')
            let query = `INSERT INTO Voters(name, last_name, gender, age)
                       VALUES ("${record[0]}", "${record[1]}", "${record[2]}", "${record[3]}")`;
            db.run(query, function (err) {
                if (err) throw err;
                
            });
            
        }
    
        for (let i = 1; i < dataVotes.length; i++) {
            let record = dataVotes[i].split(',')
            
            let query = `INSERT INTO Votes(id_voters, id_candidates)
                        VALUES ("${record[0]}", "${record[1]}")`;
            db.run(query, function (err) {
                if (err) throw err;
                console.log(record)
            });
            
        }
    })
}

// CRUD CANDIDATE
function insertCandidate(new_name, new_party, new_location, new_grade_current){
    let query = `  INSERT INTO Candidates (name, party, location, grade_current)
                   VALUES ("${new_name}", "${new_party}", "${new_location}", "${new_grade_current}")`;
    db.run(query, function (err) {
        if (err) throw err;
        console.log("data inserted")
    });
}
function updateCandidate(target_id, new_name, new_party, new_location, new_grade_current) {
    const query = ` UPDATE Candidates
                    SET name  ="${new_name}",
                        party ="${new_party}",
                        location        ="${new_location}",
                        grade_current = "${new_grade_current}"
                    WHERE id=${target_id}`;
    db.run(query, function (err) {
        if (err) throw err;
        console.log("data updated")
    });
}
function deleteCandidate(target_id) {
    const query = `DELETE FROM Candidates WHERE id=${target_id}`;
    db.run(query, function (err) {
        if (err) throw err;
        console.log("data deleted")
    });
}

// CRUD Voters
function insertVoters(new_first_name, new_last_name, new_gender, new_age){
    let query = `  INSERT INTO Voters (name, last_name, gender, age)
                   VALUES ("${new_first_name}", "${new_last_name}", "${new_gender}", "${new_age}")`;
    db.run(query, function (err) {
        if (err) throw err;
        console.log("data inserted")
    });
}
function updateVoters(target_id, new_first_name, new_last_name, new_gender, new_age) {
    const query = `UPDATE Voters
                    SET name    = "${new_first_name}",
                        last_name ="${new_last_name}",
                        gender  ="${new_gender}",
                        age = "${new_age}"
                    WHERE id=${target_id}`;
    db.run(query, function (err) {
        if (err) throw err;
        console.log("data updated")
    });
}
function deleteVoters(target_id) {
    const query = `DELETE FROM Voters WHERE id=${target_id}`;
        db.run(query, function (err) {
            if (err) throw err;
            console.log("data deleted")
        });
}

// CRUD Votes
function insertVotes(id_voters, id_candidates){
    let query = `INSERT INTO Votes (name, party, location, grade_current)
                 VALUES ("${id_voters}", "${id_candidates}")`;
    db.run(query, function (err) {
        if (err) throw err;
        console.log("data inserted")
    });
}
function updateVotes(target_id, id_voters, id_candidates) {
    const query = ` UPDATE Votes
                    SET id_voters ="${id_voters}",
                        id_candidates ="${id_candidates}"
                    WHERE id=${target_id}`;
        db.run(query, function (err) {
            if (err) throw err;
            console.log("data updated")
        });
}
function deleteVotes(target_id) {
    const query = `DELETE FROM Votes WHERE id=${target_id}`;
        db.run(query, function (err) {
            if (err) throw err;
            console.log("data deleted")
        });
}

function getAll(tablename) {
    db.all(`SELECT * FROM ${tablename}`, function (err, data) {
        console.log(data);
      });
}

function help(){
        console.log(`Help:
    SEED DATA : node seed-data.js seedData
    [INSERT DATA CANDIDATES]
    [1] node seed-data.js insert candidate new_name new_party new_location new_grade_current  
    [UPDATE DATA CANDIDATES]
    [2] node seed-data.js update candidate target_id  new_name new_party new_location new_grade_current
    [DELETE DATA CANDIDATES]
    [3] node seed-data.js delet candidate target_id 

    [INSERT DATA VOTERS]
    [1] node seed-data.js insert voters first_name last_name gender, age
    [UPDATE DATA VOTERS]
    [2] node seed-data.js update voters target_id first_name last_name gender age
    [DELETE DATA VOTERS]
    [3] node seed-data.js delete voters target_id 

    [INSERT DATA VOTES]
    [1] node seed-data.js insert votes id_voters id_candidates
    [UPDATE DATA VOTES]
    [2] node seed-data.js update votes target_id id_voters id_candidates
    [DELETE DATA VOTES]
    [3] node seed-data.js delete votes target_id 
    `)
}

const argv = process.argv.slice(2)
switch (argv[0]) {
    case 'insert':
        switch (argv[1]) {
            case 'participants': insertCandidate(argv[2], argv[3], argv[4], argv[5])
                break;
            case 'voters' : insertVoters(argv[2], argv[3], argv[4], argv[5])
                break;
            case 'votes' : insertVotes(argv[2], argv[3])
                break;
            default: help()
                break;
        }
        break;
    case 'update':
        switch (argv[1]) {
            case 'participants': updateCandidate(argv[2], argv[3], argv[4], argv[5], argv[6])
                break;
            case 'voters' : updateVoters(argv[2], argv[3], argv[4], argv[5], argv[6])
                break;
            case 'votes' : updateVotes(argv[2], argv[3], argv[4])
                break;
            default: help()
                break;
    }
    break;
    case 'delete':
        switch (argv[1]) {
            case 'participants': deleteCandidate(argv[2])
                break;
            case 'voters' : deleteVoters(argv[2])
                break;
            case 'votes' : deleteVotes(argv[2])
                break;
            default: help()
                break;
    }
    break;
    case 'seedData' : seedData()
        break;
    default: help()
        break;
}
