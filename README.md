# poll-db-2

// Poll DB 2

// Berapa banyak vote yang diterima politicians yang memiliki grade dibawah 9 
SELECT Politicians.name, Politicians.location, Politicians.grade_current, COUNT(*) as totalVote FROM Politicians 
INNER JOIN Votes on politician_id = Politicians.id
INNER JOIN Voters on Voters.id = voter_id
GROUP BY Politicians.name HAVING grade_current < 9
ORDER BY grade_current ASC;

// 3 Politicians yang memiliki vote terbanyak dan siapa saja yang memilih politician tersebut.

CREATE VIEW top3 as 
SELECT Politicians.id, Politicians.name, COUNT(*) as totalVote FROM Politicians
INNER JOIN Votes on politician_id = Politicians.id
INNER JOIN Voters on Voters.id = voter_id
GROUP BY Politicians.name ORDER BY totalVote DESC LIMIT 3;

SELECT totalVote, top3.name, Voters.first_name||" "||Voters.last_name as votersName, Voters.gender FROM Voters
INNER JOIN Votes on voter_id = Voters.id
INNER JOIN top3 on top3.id = politician_id
ORDER BY totalVote DESC;

// List nama orang-orang yang melakukan kecurangan 

SELECT COUNT(*) as totalVote, Voters.first_name||" "||Voters.last_name as votersName, Voters.gender, Voters.age FROM Voters
INNER JOIN Votes on voter_id = Voters.id 
GROUP BY Voters.id HAVING totalVote > 1
ORDER BY totalVote DESC




