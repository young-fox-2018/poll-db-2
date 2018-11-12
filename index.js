const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./database.db');
const argv = process.argv.slice(2);

let command  = argv[0];
let option = argv.slice(1);
let tableName
let value

switch (command) {
    case "create":
        tableName = option[0];
        value = option.slice(1);
        insertData(tableName, value)
        break;

    case "delete":
        tableName = option[0];
        value = option.slice(1);
        deleteData(tableName, value)
        break;

    case "update":
        tableName = option[0];
        value = option.slice(1);
        updateData(tableName, value)
        break;
    default:
        break;
}

function insertData(tableName, value){
    let query
    if(tableName == "Politicians"){
        query = `INSERT INTO Politicians (name, party, location, grade_current)
                VALUES("${value[0]}", "${value[1]}", "${value[2]}", "${value[3]}");
        `
    }
    else if(tableName == "Voters"){
        query = `INSERT INTO Voters (first_name, last_name, gender, age)
                VALUES("${value[0]}", "${value[1]}", "${value[2]}", "${value[3]}");
        `
    }
    else{
        query = `INSERT INTO Votes (voterId, politicianId)
                VALUES("${value[0]}", "${value[1]}");
        `
    }

    db.run(query, function(err){
        if(!err) console.log(`Successfully added record to ${tableName}`)
        else console.log(`err: ${err}`)
    })
}

function deleteData (tableName, option){
    let id = option[0];
    let query = `DELETE FROM ${tableName} 
                WHERE id = "${id}"`

    db.run(query, function(err){
        if(!err) console.log(`Sucessfully deleted data from ${tableName} with ID ${id}`)
        else console.log(`err: ${err}`)
    })
}

function updateData(tableName, option){
    let id = option[0];
    
    if(tableName == "Politicians"){
        query = `UPDATE Politicians 
                SET name = "${option[1]}",
                    party = "${option[2]}",
                    location = "${option[3]}",
                    grade_current = "${option[4]}"
                    WHERE id = ${id};
        `
    }
    else if(tableName == "Voters"){
        query = `UPDATE Voters 
                SET first_name = "${option[1]}",
                    last_name = "${option[2]}",
                    gender = "${option[3]}",
                    age = "${option[4]}"
                WHERE id = ${id};
        `
    }
    else{
        query = `UPDATE Politicians 
        SET voterId = "${option[1]}",
            politicianId = "${option[2]}"
            WHERE id = ${id};
        `
    }

    db.run(query, function(err){
        if(!err) console.log(`Successfully updated record ${tableName} with ID ${id}`)
        else console.log(`err: ${err}`)
    })
}

