const db = require('../data/db')

class Model {
    static readData(query, callback) {
        db.all(query, function(err, data){
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    static query1(callback) {
        let query = 
        `SELECT name, location, grade_current, count(*) totalVote
        FROM
        (
        SELECT DISTINCT a.voterId ,a.politicianId, b.name, b.location, b.grade_current
        FROM
        votes a
        INNER JOIN 
        politicians b ON a.politicianId = b.id
        WHERE b.grade_current < 9) temp
        GROUP BY politicianId
        ORDER BY grade_current
        `

        Model.readData(query, function(err, data){
            if (err) {
                callback({
                    message: 'error read data query 1',
                    err: err
                })
            } else {
                callback(null, data)
            }
        })

    }

    static query2(callback) {
        let query = 
        `
        select totalVote, name politicianName, c.first_name || ' ' || c.last_name voterName, c.gender from
            (
                select count(*) totalVote, a.politicianId, b.name
                from votes a
                inner join politicians b on a.politicianId = b.id
                group by politicianId
                order by totalVote desc
                limit 3
            ) temp
        
            inner join votes b on temp.politicianId = b.politicianId 
            inner join voters c on b.voterId = c.id
            order by totalVote desc, politicianName
        `

        Model.readData(query, function(err, data){
            if (err) {
                callback({
                    message: 'error read data query 2',
                    err: err
                })
            } else {
                callback(null, data)
            }
        })
    }

    static query3(callback) {
        let query = 
        `
        select totalVote, b.first_name || ' ' || b.last_name name, b.gender, b.age
        from (
            select count(*) totalVote, voterId  from votes 
            group by voterId
            order by totalVote desc
        ) temp
        inner join voters b on temp.voterId = b.id
        where totalVote > 1
        `

        Model.readData(query, function(err, data){
            if (err) {
                callback({
                    message:'error read data pada query 3',
                    err: err
                })
            } else {
                callback(null, data)
            }
        })
    }
}

module.exports = Model