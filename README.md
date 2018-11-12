# poll-db-2

```sql
1.
SELECT politicians.name, politicians.location, politicians.grade_current, count(*) as totalVote 
FROM votes
JOIN politicians
ON politicianId  = politicians.id
WHERE grade_current < 9
GROUP BY politicians.id
ORDER BY grade_current ASC

2.
SELECT totalVote, politicians.name, voters.firstName ||' '|| voters.lastName as voterName, voters.gender FROM (SELECT count(*) as totalVote, politicianId
FROM votes
GROUP BY politicianId
ORDER BY totalVote DESC
LIMIT 3) as highest
JOIN votes
ON votes.politicianId = highest.politicianId
JOIN voters
ON votes.voterId = voters.id
JOIN politicians
ON votes.politicianId = politicians.id
ORDER BY totalVote DESC

3. 
SELECT voteCount.totalVote, voters.firstName ||' '|| voters.lastName as name, voters.gender, voters.age 
FROM (SELECT count(*) as totalVote, voterId FROM votes
GROUP BY voterId) as voteCount
JOIN voters
ON voteCount.voterId = voters.id
WHERE voteCount.totalVote > 1
ORDER BY voteCount.totalVote DESC
```
