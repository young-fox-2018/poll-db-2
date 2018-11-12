const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');
const fs = require('fs');

function readCSV(filepath) {
    let data = fs.readFileSync(filepath);
    return data.toString().split('\n');
}

function insertData(){
    db.serialize(function() {
        let politicians = readCSV('./politicians.csv');
        for (let i = 1; i < politicians.length; i++) {
            let arr = politicians[i].split(',');
            db.run(`INSERT INTO politicians (name, party, location, grade_current) VALUES ($name, $party, $location, $grade)`, 
                    {
                        $name: arr[0],
                        $party: arr[1],
                        $location: arr[2],
                        $grade: arr[3]
                    }, function(err) {
                        if (err) {
                            console.log(`Error insert into politicians table ,`, err);
                        } else {
                            console.log(`Successfully insert data into politicians table`);
                        }
                    }
            );
        }

        let voters = readCSV('./voters.csv');    
        for (let i = 1; i < voters.length; i++) {
            let arr = voters[i].split(',');                    
            db.run(`INSERT INTO voters (first_name, last_name, gender, age) 
                    VALUES ($first, $last, $gender, $age)`, 
                    {
                        $first: arr[0],
                        $last: arr[1],
                        $gender: arr[2],
                        $age: arr[3]
                    },
                    function(err) {
                        if (err) {
                            console.log(`Error insert into voters table, `, err);
                        } else {
                            console.log(`Successfully insert data into voters table`);
                        }
                    }
            );
        }

        let votes = readCSV('./votes.csv');
        for (let i = 1; i < votes.length; i++) {
            let arr = votes[i].split(',');            
            db.run(`INSERT INTO votes (voterId, politicianId) VALUES ($voter, $politician)`,
                {
                    $voter: Number(arr[0]),
                    $politician: Number(arr[1])
                },
                function(err) {
                    if (err) {
                        console.log(`Error insert into votes table, `, err);
                    } else {
                        console.log(`Successfully insert data into votes table`);
                    }
                }
            );
        }
    })
};

insertData();