const fs = require('fs')
const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./data.db');

function challenge1() {
    const query = `SELECT name, location, grade_current, COUNT(*) AS "totalVote"  
                    FROM  Votes JOIN Candidates 
                    ON  Votes.id_candidates = Candidates.id 
                    WHERE Candidates.grade_current < 9
                    GROUP BY name
                    ORDER BY totalVote ASC
                    LIMIT 3;`
    db.all(query, function (err,data) {
        if (err) throw err;
        console.log(data)
    });
}

function challenge2() {
    
    const query = `SELECT totalVote, subQuery.name as "politicianName", Voters.name || " " || Voters.last_name AS "voterName", Voters.gender
                   FROM 
                   (SELECT COUNT(*) AS totalVote, id_candidates AS "idCandidates", Candidates.name FROM VOTES 
                   JOIN Candidates ON idCandidates = Candidates.id
                   GROUP BY id_candidates ORDER BY totalVote DESC LIMIT 3) as subQuery
                
                    INNER JOIN  Votes ON Votes.id_candidates = subQuery.idCandidates
                    INNER JOIN Voters ON Voters.id = Votes.id_voters
                    ORDER BY totalVote DESC, subQuery.name 
                    `

    db.all(query, function (err,data) {
        if (err) throw err;
        console.log(data)
    });
}

function challenge3() {
    const query = ` SELECT totalVote, Voters.name || " " || Voters.last_name AS name, gender, age
                    FROM 
                        (SELECT COUNT(*) AS "totalVote", id_voters FROM Votes 
                        GROUP BY id_voters
                        ORDER BY totalVote DESC) subquery
                    JOIN Voters  ON Voters.id = subquery.id_voters
                    WHERE totalVote > 1`
    db.all(query, function (err,data) {
        if (err) throw err;
        console.log(data)
    });
}

function challenge4() {
    
    const query = `SELECT COUNT(*) AS "totalVote", name, party, location
    FROM Votes JOIN Candidates
    ON  Votes.id_candidates = Candidates.id 
    GROUP BY name
    ORDER BY totalVote DESC
    LIMIT 3;`

    db.all(query, function (err,data) {
        if (err) throw err;
        console.log(data)
    });
}

function challenge5() {
    
    const query = `SELECT name, last_name, gender, age
    FROM Votes JOIN Voters
    ON  Voters.id = Votes.id_voters
    WHERE Votes.id_candidates = (SELECT id FROM Candidates WHERE name = "Olympia Snowe");`

    db.all(query, function (err,data) {
        if (err) throw err;
        console.log(data)
    });
}



challenge3()