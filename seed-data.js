const fs = require("fs");
const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./database.db');

let politiciansData = fs.readFileSync("./politicians.csv", "utf-8").trim();
let newPolData = [];
let votersData = fs.readFileSync("./voters.csv", "utf-8").trim();
let newVotersData = [];
let votesData = fs.readFileSync("./votes.csv", "utf-8").trim().split("\n");

db.serialize(function(){
        //=============INITIAL INSERT TO POLIICIANS============
    politiciansData = politiciansData.split("\n");


    for(let i = 1; i < politiciansData.length; i++){
        let temp = politiciansData[i].split(",")
        let curObj = {
            name : temp[0],
            party : temp[1],
            location : temp[2],
            grade_current : temp[3]
        }
        newPolData.push(curObj)
    }

    for(let i = 0; i < newPolData.length; i++){
        let query = `INSERT INTO Politicians (name, party, location, grade_current)
            VALUES ('${newPolData[i].name}',"${newPolData[i].party}", "${newPolData[i].location}", "${newPolData[i].grade_current}")`

            // console.log(query)
        db.run( query ,function(err){
            if(!err){
                console.log(`successfully inserted politician ${newPolData[i].name} data`)
            }
            else console.log(`err: ` + err)
        })
    }





    //=============INITIAL INSERT TO VOTERS============

    votersData = votersData.split("\n");

    for(let i = 1 ; i < votersData.length; i++){
        let temp = votersData[i].split(",")
        let curObj = {
            first_name : temp[0],
            last_name : temp[1],
            gender: temp[2],
            age: temp[3],
        }
        newVotersData.push(curObj)
    }

    for(let i = 0; i < newVotersData.length; i++){
        let query = `INSERT INTO Voters (first_name, last_name, gender, age)
            VALUES ('${newVotersData[i].first_name}',"${newVotersData[i].last_name}", "${newVotersData[i].gender}", "${newVotersData[i].age}")`

            console.log(query)
        db.run( query ,function(err){
            if(!err){
                console.log(`successfully inserted Voters ${newVotersData[i].first_name} data`)
            }
            else console.log(`err: ` + err)
        })
    }

    // console.log(newVotersData)

    //==============INITIAL INSERT TO VOTES============

    for(let i = 1; i < votesData.length; i++){
        votesData[i] = votesData[i].split(",");
        console.log(votesData[i])
        let query = `INSERT INTO Votes (voterId, politicianId)
                    VALUES ("${votesData[i][0]}", "${votesData[i][1]}" )`

        db.run(query,function(err){
                    if(!err){
                        console.log(`successfully inserted Votes data`)
                    }
                    else console.log(`err: ` + err)
                })
    }

})


