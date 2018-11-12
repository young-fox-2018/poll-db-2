/*
release 0.1

SELECT Politicians.name, Politicians.location, Politicians.grade_current, count(*) AS TotalVote
FROM Politicians JOIN Votes 
On Votes.politicianId = Politicians.id
WHERE grade_current < 9
GROUP BY Politicians.id;

Release 0.2

SELECT politicianID, Politicians.name, Politicians.party, COUNT(*) as totalVotes
FROM Votes JOIN Politicians
ON Votes.politicianId = Politicians.id
GROUP BY politicianId 
ORDER BY totalVotes Desc
LIMIT 3;

SELECT supportingTable.totalVotes, supportingTable.name, (Voters.first_name || " " || Voters.last_name) AS voterName, Voters.gender
FROM (SELECT politicianID, Politicians.name, Politicians.party, COUNT(*) as totalVotes
FROM Votes JOIN Politicians
ON Votes.politicianId = Politicians.id
GROUP BY politicianId 
ORDER BY totalVotes Desc
LIMIT 3) AS supportingTable
JOIN Votes
ON supportingTable.politicianId = Votes.politicianId
Join Voters
ON Votes.voterId = Voters.id
ORDER BY totalVotes DESC, supportingTable.name, VoterName;

Release 0.3

SELECT Voters.id, (Voters.first_name ||" "|| Voters.last_name) AS Name , Voters.gender, Voters.age, Count(*) AS totalVote
FROM Votes JOIN Voters
ON Votes.voterId = Voters.id
GROUP BY Voters.id HAVING COUNT(Votes.voterId) > 1
ORDER BY totalVote DESC;


*/