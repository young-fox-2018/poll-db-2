# poll-db-2
RELEASE 0
Part 1
```SQL
SELECT a.name,a.location,a.grade_current,count(*)totalVote FROM Politicians a
    LEFT JOIN Votes b ON a.id=b.politicianId
WHERE grade_current < 9
GROUP BY a.name,a.location,a.grade_current
ORDER BY totalVote ASC
```
Part 2
``` SQL

SELECT a.totalVote,c.name politicianName,d.first_name||' '||d.last_name as voterNmae,d.gender FROM (
	SELECT x.politicianId,count(*)totalVote  FROM Votes x
	GROUP BY x.politicianId
	ORDER BY totalVote DESC
LIMIT 3)a
    INNER JOIN Votes b ON a.politicianId=b.politicianId
    INNER JOIN Politicians c ON b.politicianId=c.id
    INNER JOIN Voters d ON b.voterId=d.id
```
Part 3
```SQL
SELECT x.totalVote,y.first_name||' '||y.last_name AS name,y.gender,y.age FROM (
	SELECT a.voterId,count(*)totalVote FROM Votes a
	GROUP BY a.voterId
	HAVING count(*)>1
	ORDER BY totalVote DESC)x 
INNER JOIN Voters y ON x.voterId=y.id

```