-- name: GetUserById :one
SELECT * FROM users 
WHERE id = $1 LIMIT 1;

-- name: GetUserByUsername :one
SELECT * FROM users 
WHERE username = $1 LIMIT 1;
