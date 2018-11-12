//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')


class Setup {
    static init() {
        db.serialize(function() {
            db.run(`DROP TABLE IF EXISTS "politicians"`)
            db.run(`DROP TABLE IF EXISTS "voters"`)
            db.run(`DROP TABLE IF EXISTS "votes"`)

            db.run(`CREATE TABLE IF NOT EXISTS "politicians" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "name" VARCHAR(255) NOT NULL,
                "party" VARCHAR(255) NOT NULL,
                "location" VARCHAR(255) NOT NULL,
                "grade_current" REAL NOT NULL
            );`)
        
            db.run(`CREATE TABLE IF NOT EXISTS "voters" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "first_name" VARCHAR(255) NOT NULL,
                "last_name" VARCHAR(255) NOT NULL,
                "gender" VARCHAR(255) NOT NULL,
                "age" INTERGER NOT NULL 
            );`)
        
            db.run(`CREATE TABLE IF NOT EXISTS "votes" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "voterId" INTEGER NOT NULL,
                "politicianId" INTEGER NOT NULL,
                    FOREIGN KEY(voterId) REFERENCES voters(id),
                    FOREIGN KEY(politicianId) REFERENCES politicians(id)
            );`)
        })
    }
}

module.exports = {
    db,
    Setup
}
    