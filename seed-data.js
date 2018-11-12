const fs = require('fs')
const db = require('./setup.js')

const poll = fs.readFileSync('./votes.csv', 'utf8').split('\n')
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
const candidates = fs.readFileSync('./politicians.csv', 'utf8').split('\n')

let argv = process.argv.slice(2)




if (argv[0] == "insert"){
  // BENTUK INPUTAN ==> COMMAND , table apa ==> votes | voters | candidates , valuenya
  switch (argv[1]) {
    case "votes": insertVotes(); break;
    case "voters": insertVoters(); break;
    case "candidates": insertCandidates(); break;
    default: " invalid input "; break;
  }
}else if (argv[0] == "update"){
  // BENTUK INPUTAN ==> COMMAND , table apa ,id , valuenya

  switch (argv[1]) {
    case "votes": updateVotes(); break;
    case "voters": updateVoters(); break;
    case "candidates": updateCandidates(); break;
    default: " invalid input "; break;
  }
} else if (argv[0] == "delete"){
    // BENTUK INPUTAN ==> COMMAND , table apa ,id
  switch (argv[1]) {
    case "votes": deleteVotes(); break;
    case "voters": deleteVoters(); break;
    case "candidates": deleteCandidates(); break;
    default: " invalid input "; break;
  }
}else if (argv[0] == "get"){
  getdata()
}

function getdata(){
  db.serialize(function(){
    for (let i = 1; i < poll.length; i++) {
      const masuk = poll[i].split(',')
      const qvotes = `
      INSERT INTO polls (voter_id,candidate_id) VALUES (${masuk[0]},${masuk[1]})
    `   
    db.run(qvotes, function(err){
      if(!err) {
        console.log('Data baru berhasil ditambahkan ke dalam poll.')
      } else {
        console.log(`err :` , err)
      }
    })
    }
  
    for (let i = 1; i < voters.length; i++) {
      const masuk = voters[i].split(',')
      const qvoters = `
      INSERT INTO voters (first_name, last_name, gender , age) VALUES ("${masuk[0]}","${masuk[1]}", "${masuk[2]}", ${masuk[3]})
    `   
    db.run(qvoters, function(err){
      if(!err) {
        console.log('Data baru berhasil ditambahkan ke dalam voters.')
      } else {
        // console.log(masuk)
        console.log(`err :` , err)
      }
    })
    }
  
    for (let i = 1; i < candidates.length; i++) {
      const masuk = candidates[i].split(',')
      const qcandidates = `
      INSERT INTO candidates (name, party, location , grade_current)VALUES ("${masuk[0]}","${masuk[1]}","${masuk[2]}", ${masuk[3]})
    `   
    db.run(qcandidates, function(err){
      if(!err) {
        console.log('Data baru berhasil ditambahkan ke dalam candidates.')
      } else {
        // console.log(masuk)
        console.log(`err :` , err)
      }
    })
    }
  })
  
}


function insertVoters(){
  let voters = `INSERT INTO voters (first_name, last_name, gender , age) VALUES ("${argv[2]}","${argv[3]}", "${argv[4]}", ${argv[5]})`
  db.serialize(function(){
    db.run(voters, function(err) {
      if(!err) {
        console.log('1 data baru berhasil ditambahkan ke dalam voters.')
      } else {
        console.log(`err :` , err)

      }
    })
  })
}

function insertVotes(){
  let votes = `INSERT INTO polls (voter_id,candidate_id) VALUES (${argv[2]}, ${argv[3]})`
  db.serialize(function(){
    db.run(votes, function(err) {
      if(!err) {
        console.log('1 data baru berhasil ditambahkan ke dalam votes.')
      } else {
        console.log(`err :` , err)

      }
    })
  })
}

function insertCandidates(){
  let candidates = `INSERT INTO  candidates (name, party, location , grade_current) VALUES ("${argv[2]}", "${argv[3]}", "${argv[4]}" , ${argv[5]})`
  db.serialize(function(){
    db.run(candidates, function(err) {
      if(!err) {
        console.log('1 data baru berhasil ditambahkan ke dalam candidates.')
      } else {
        console.log(`err :` , err)

      }
    })
  })
}

function updateVotes(){
  db.serialize(function(){
    db.run(`UPDATE votes SET ${argv[3]} = "${argv[4]}" WHERE id = ${argv[2]}` , function(err) {
      if(!err) {
        console.log(`Votes id ${argv[2]} berhasil diubah`)
      } else {
        console.log(`Err :` , err)
      }
    })
  })
}

function updateVoters(){
  db.serialize(function(){
    db.run(`UPDATE votes SET ${argv[3]} = "${argv[4]}" WHERE id = ${argv[2]}` , function(err) {
      if(!err) {
        console.log(`Voters id ${argv[2]} berhasil diubah`)
      } else {
        console.log(`Err :` , err)
      }
    })
  })
}

function updateCandidates(){
  db.serialize(function(){
    db.run(`UPDATE votes SET ${argv[3]} = "${argv[4]}" WHERE id = ${argv[2]}` , function(err) {
      if(!err) {
        console.log(`Candidates id ${argv[2]} berhasil diubah`)
      } else {
        console.log(`Err :` , err)
      }
    })
  })
}


function deleteVotes (){
  db.serialize(function(){
    db.run(`DELETE FROM polls WHERE id = ${argv[2]}` , function(err) {
      if (!err) {
        console.log(`Berhasil mendelete data ber-id ${argv[2]}`)
      } else {
        console.log(`Err :` , err)
      }
    })
  })
}

function deleteVoters (){
  db.serialize(function(){
    db.run(`DELETE FROM voters WHERE id = ${argv[2]}` , function(err) {
      if (!err) {
        console.log(`Berhasil mendelete data ber-id ${argv[2]}`)
      } else {
        console.log(`Err :` , err)
      }
    })
  })
}

function deleteCandidates (){s
  db.serialize(function(){
    db.run(`DELETE FROM candidates WHERE id = ${argv[2]}` , function(err) {
      if (!err) {
        console.log(`Berhasil mendelete data ber-id ${argv[2]}`)
      } else {
        console.log(`Err :` , err)
      }
    })
  })
}