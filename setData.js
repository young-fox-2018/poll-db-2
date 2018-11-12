
const fs = require("fs");
const db = require("./databases.js");

db.serialize(function(){
    let voters = fs.readFileSync("voters.csv", "utf8").split("\n");
    for(let i = 1; i < voters.length - 1; i++) {
        let dataVoters = voters[i].split(",");
        let votersQuery = `INSERT INTO voters (first_name, last_name, gender, age)
                           VALUES ("${dataVoters[0]}", "${dataVoters[1]}", "${dataVoters[2]}", ${dataVoters[3]});`
        db.run(votersQuery, function(err){
            if(err) throw err
        }) 
    }

    let politicians = fs.readFileSync("politicians.csv", "utf8").split("\n");
    for(let i = 1; i < politicians.length - 1; i++) {
        let dataPoliticians = politicians[i].split(",");
        let politiciansQuery = `INSERT INTO politicians (name, party, location, grade_current)
                                VALUES ("${dataPoliticians[0]}","${dataPoliticians[1]}","${dataPoliticians[2]}", ${dataPoliticians[3]});`
        db.run (politiciansQuery, function(err) {
            if(err) throw err
        })   
    }

    let polling = fs.readFileSync("votes.csv", "utf8").split("\n");
    for(let i = 1; i < polling.length - 1; i++) {
        let dataPolling = polling[i].split(",");
        let pollingQuery = `INSERT INTO votes (votersId, politiciansId)
                            VALUES ("${dataPolling[0]}", "${dataPolling[1]}")`;
        db.run(pollingQuery, function(err){
            if(err) throw err;
        })
    }
})