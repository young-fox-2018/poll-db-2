const db = require('./db.js')
const fs = require('fs')


db.serialize(function(){
    let file = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
    // console.log(file[file.length-2])
    for (let i = 1; i < file.length-1; i++) {
        let data = file[i].split(',')
        
        
        const politicianrow = `INSERT INTO politicians (name,party,location,grade_current)
                                VALUES ("${data[0]}","${data[1]}","${data[2]}","${data[3]}")`

        db.run(politicianrow,function(err){
            if(err){
                console.log(err)
            }else{
                console.log(`masuk nih insertnya politicians`)
            }
        })
    }

    let datavoters = fs.readFileSync('./voters.csv','utf8').split('\n')
    for(let j = 1; j < datavoters.length-1;j++){
        let data = datavoters[j].split(',')

        const votersrow = `INSERT INTO voters (first_name,last_name,gender,age)
        VALUES ("${data[0]}","${data[1]}","${data[2]}","${data[3]}")`

        db.run(votersrow,function(err){
            if(err){
                console.log(err)
            }else{
                console.log(`masuk nih insertnya voters`)
            }
        })
    }

    let datavotes = fs.readFileSync('./votes.csv','utf8').split('\n')
    for(let k = 0 ; k < datavotes.length-1;k++){
        let data = datavotes[k].split(',')

        const votesrow = `INSERT INTO votes (voter_id,politician_id)
        VALUES ("${data[0]}","${data[1]}")`

        db.run(votesrow,function(err){
            if(err){
                console.log(err)
            }else{
                console.log(`masuk nih votesnya`)
            }
        })

    }

})