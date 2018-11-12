# poll-db-2

POLL DB2
1.
SELECT name, location, grade, COUNT(*) AS totalVote
FROM politicians
JOIN votes ON politicians.politicianId = votes.politicianId
WHERE grade < 9
GROUP BY name
ORDER BY totalVote asc;

2.
SELECT totalVote, politicianName, (firstName || ' ' || lastName) AS voterName, gender
FROM (SELECT COUNT(*) AS totalVote, votes.politicianId, name AS politicianName FROM votes
JOIN politicians ON votes.politicianId = politicians.politicianId
GROUP BY votes.politicianId
ORDER BY totalVote DESC
LIMIT 3) AS topThree
JOIN votes ON votes.politicianId = topThree.politicianId
JOIN voters ON votes.voterId = voters.voterId
ORDER by totalVote DESC, politicianName;

3.
SELECT COUNT(*) AS totalVote, (voters.firstName || ' ' || voters.lastName) AS name, gender, age
FROM voters JOIN votes ON votes.voterId = voters.voterId
GROUP BY name
ORDER BY totalVote desc;