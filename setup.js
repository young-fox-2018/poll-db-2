
const db = require('./db.js')


db.serialize(function(){
    const politicians  = `CREATE TABLE IF NOT EXISTS politicians (
    
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(50),
                        party VARCHAR(20),
                        location VARCHAR(10),
                        grade_current INTEGER
    
                        )`

    db.run(politicians, function(err){
        if(err){
            console.log(err)
        }else{
            console.log(`sukses masuk coyy`)
        }
    })

    const Voters = `CREATE TABLE IF NOT EXISTS voters (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    first_name VARCHAR(50),
                    last_name VARCHAR(50),
                    gender VARCHAR(6),
                    age INTERGER
                    )`
    db.run(Voters , function(err){
        if(err){
            console.log(err)
        }else{
            console.log(`sukses mayuk coy`)
        }
    })

    const Votes = `CREATE TABLE IF NOT EXISTS votes (
                    voter_id INTEGER,
                    politician_id INTEGER,
                    FOREIGN KEY (voter_id) REFERENCES voters(id),
                    FOREIGN KEY (politician_id) REFERENCES politicians(id)
                    )`

    db.run(Votes , function(err){
        if(err){
            console.log(err)
        }else{
            console.log(`sukses masuk coy`)
        }
    })
})



//your code here
