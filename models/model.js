const db = require("./connectDB")



class Model {
    static gradeBelow9() {
        let query = `SELECT Politicians.name, Politicians.location, Politicians.grade_current, COUNT(*) as totalVote FROM Politicians 
                     INNER JOIN Votes on politician_id = Politicians.id
                     INNER JOIN Voters on Voters.id = voter_id
                     GROUP BY Politicians.name HAVING grade_current < 9
                     ORDER BY grade_current ASC;`

        db.all(query, [], function(err, row) {
            if (err) throw err
            console.log(row)
        })
    }

    static top3() {
        let query1 = `CREATE VIEW top3 as 
                      SELECT Politicians.id, Politicians.name, COUNT(*) as totalVote FROM Politicians
                      INNER JOIN Votes on politician_id = Politicians.id
                      INNER JOIN Voters on Voters.id = voter_id
                      GROUP BY Politicians.name ORDER BY totalVote DESC LIMIT 3;`
        let query2 = `SELECT totalVote, top3.name, Voters.first_name||" "||Voters.last_name as votersName, Voters.gender FROM Voters
                      INNER JOIN Votes on voter_id = Voters.id
                      INNER JOIN top3 on top3.id = politician_id
                      ORDER BY totalVote DESC;`
        db.serialize(function() {
            // db.run(query1, function(err) {
            //     if (err) throw err
            // })
            db.all(query2, [], function(err, data) {
                if (err) throw err
                console.log(data)
            })
        }) 
    }

    static cheaters() {
        let query = `SELECT COUNT(*) as totalVote, Voters.first_name||" "||Voters.last_name as votersName, Voters.gender, Voters.age FROM Voters
                     INNER JOIN Votes on voter_id = Voters.id 
                     GROUP BY Voters.id HAVING totalVote > 1
                     ORDER BY totalVote DESC`

        db.each(query, [], function(err, result) {
            if (err) throw err
            console.log(result)
        })
    }

}
// Model.gradeBelow9()

// Model.top3()

Model.cheaters()



