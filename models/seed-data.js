const db = require("./connectDB")
const fs = require("fs")

function run(query) {
    db.run(query, function(err) {
        if (err) throw err
        console.log("Successfully seed data")
    })
}

function seed(path) {
    fs.readFile(path, "utf-8", function(err, data) {
        if (err) throw err
        data = data.split("\n")
        var query = null
        for (let i = 1; i < data.length-1; i++) {
             let current = data[i].split(",")
             if (current.length == 2) {
                    query = `INSERT INTO Votes (politician_id, voter_id) VALUES ("${current[1]}","${current[0]}");`
             } else {
                if (current[2] == "male" || current[2] == "female") {
                    query = `INSERT INTO Voters (first_name, last_name, gender, age) VALUES ("${current[0]}", "${current[1]}", "${current[2]}", "${current[3]}");`
                } else {
                    query = `INSERT INTO Politicians (name, party, location, grade_current) VALUES ("${current[0]}", "${current[1]}", "${current[2]}", "${current[3]}");`
                }
             }
             db.serialize(function() {
                 run(query)
             })   
        }
    })
}




seed("../politicians.csv")
seed("../voters.csv")
seed("../votes.csv")



