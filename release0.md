number 1
SELECT name , location , grade_current , COUNT(*) AS Totalvote
FROM politicians
JOIN votes ON politicians.id = votes.politician_id
WHERE grade_current < 9
GROUP BY name
ORDER BY grade_current ASC;

number 2
SELECT Totalvote ,name, first_name || " " || last_name AS VoterName , gender 
FROM(
SELECT COUNT(*) AS Totalvote , name, politicians.id
FROM politicians
JOIN votes ON politicians.id = votes.politician_id
GROUP BY name
ORDER BY Totalvote desc
LIMIT 3) AS table1 
JOIN votes ON table1.id = votes.politician_id
JOIN voters ON votes.voter_id = voters.id
ORDER BY Totalvote DESC ,name

number 3
SELECT COUNT(*) AS Totalvotes , first_name || " " || last_name AS name,gender,age
FROM voters
JOIN votes ON voters.id = votes.voter_id
GROUP BY voters.id
HAVING Totalvotes > 1
ORDER BY Totalvotes DESC;

