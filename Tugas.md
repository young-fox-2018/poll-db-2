NO. 1 
SELECT name , location , grade_current , COUNT(*) AS totalVote 
FROM candidates 
JOIN polls ON candidates.id = polls.candidate_id 
WHERE grade_current < 9
GROUP BY name
ORDER BY grade_current asc;

NO. 2
SELECT totalVote , name, first_name ||" "|| last_name AS voterName , gender 
FROM
(SELECT COUNT(*) AS totalVote , name, candidates.id 
FROM candidates 
JOIN polls ON candidates.id = polls.candidate_id 
GROUP BY name
ORDER BY totalVote desc
LIMIT 3) AS table1 
JOIN polls ON table1.id = polls.candidate_id
JOIN voters ON polls.voter_id = voters.id
ORDER BY totalVote desc, name 




NO. 3 
SELECT COUNT(*) AS totalVotes , first_name || " "|| last_name AS name, gender , age
FROM voters
JOIN polls ON voters.id = polls.voter_id 
GROUP BY voters.id
HAVING totalVotes > 1
ORDER BY totalVotes desc;
