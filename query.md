``` SQL
SELECT politicians.name, politicians.location, politicians.grade_current, COUNT(*) AS totalVote FROM politicians
LEFT JOIN votes ON politicians.id = votes.politicianId
WHERE politicians.grade_current < 9
GROUP BY politicians.name
ORDER BY totalVote ASC
```