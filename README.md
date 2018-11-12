# poll-db-2

```sql
1.
SELECT politicians.name, politicians.location, politicians.grade_current, COUNT(votes.politicianId) AS totalVote
FROM politicians
INNER JOIN votes ON votes.politicianId = politicians.politicianId
WHERE politicians.grade_current < 9
GROUP BY votes.politicianId
ORDER BY politicians.grade_current ASC;

2.
SELECT totalVotes,
politicianName,
voters.first_name ||" "|| voters.last_name AS voterName,
voters.gender AS gender
FROM
    (
        SELECT count(votes.politicianId) AS totalVotes,
        politicians.name AS politicianName,
        politicians.politicianId AS politicianID
        FROM votes
        INNER JOIN politicians ON politicians.politicianId = votes.politicianId
        GROUP BY politicians.name
        ORDER BY totalVotes DESC
        LIMIT 3
    ) AS tmpTable
JOIN votes ON votes.politicianId = tmpTable.politicianID
JOIN voters ON voters.voterId = votes.voterId 
ORDER BY totalVotes DESC, politicianName;

3.
SELECT count(voters.voterId) AS totalVote,
voters.first_name ||" "|| voters.last_name AS name,
voters.gender AS gender,
voters.age AS age
FROM 
    ( 
        SELECT votes.voterId as voterVotes
        FROM votes
        INNER JOIN voters ON voters.voterId = votes.voterId
    ) AS tmpTable
JOIN voters ON voters.voterId = tmpTable.voterVotes
GROUP BY voters.voterId
ORDER BY totalVote DESC;
```