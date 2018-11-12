# poll-db-2
```sql
1.
SELECT  name, location ,grade_current , COUNT(*) AS totalVote FROM Politicians
JOIN Votes ON Votes.politicianId=Politicians.id
WHERE grade_current<9
GROUP BY politicianId

2. 

SELECT  totalVotes, name AS politiccianName,first_name||' '||last_name AS voterName,gender FROM (SELECT COUNT(*) AS totalVotes,politicianId FROM Votes 
GROUP BY politicianId
ORDER BY totalVotes DESC
LIMIT 3) AS politician
JOIN Votes ON politician.politicianId=Votes.politicianId
JOIN Voters ON Votes.voterId=Voters.id
JOIN Politicians ON Votes.politicianId=Politicians.id
ORDER BY totalVotes DESC

3.

SELECT totalVotes , first_name||' '||last_name AS name, gender, age 
FROM (SELECT COUNT(*) totalVotes,voterId FROM Votes 
GROUP BY  voterId
having totalVotes > 1) AS dataVotes
JOIN Voters ON Voters.id=dataVotes.voterId
ORDER BY totalVotes DESC


```



