const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');


db.serialize(function() {
    const query1 = `SELECT name, location, grade_current, 
                    COUNT(votes.voterId) AS totalVote
                    FROM politicians 
                    JOIN votes ON politicians.id = votes.politicianId 
                    WHERE grade_current < 9 
                    GROUP BY grade_current;`

    db.all(query1, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });

    const query2 = `SELECT totalVote, name as politicianName, (first_name || ' ' || last_name) AS voterName, gender
                    FROM (
                        SELECT COUNT(*) AS totalVote, politicians.id, name FROM votes 
                        JOIN politicians ON politicianId = politicians.id 
                        GROUP BY name
                        ORDER BY totalVote DESC LIMIT 3
                        ) AS TOP3
                    JOIN VOTES ON TOP3.id = votes.politicianId
                    JOIN VOTERS ON votes.voterId = voters.id                
                    ORDER BY totalVote DESC, name`;

    db.all(query2, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
    
    
    const query3 = `SELECT COUNT(voterId) AS totalVote, (first_name || ' ' || last_name) AS name, gender, age 
                    FROM votes 
                    JOIN voters ON votes.voterId = voters.id 
                    GROUP BY name
                    ORDER BY totalVote DESC`;

    db.all(query3, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
    
});
