-- name: GetUserById :one
SELECT * FROM users 
WHERE id = $1 LIMIT 1;

-- name: GetUserByEmail :one
SELECT * FROM users 
WHERE email = $1 LIMIT 1;

-- name: InsertUser :exec
INSERT INTO users (
  id,username,email,password,created_at,created_by
) VALUES (
  $1, $2, $3, $4, $5, $6
);

-- name: GetUserList :many
SELECT * 
FROM users 
WHERE username LIKE $1 AND email LIKE $2 AND is_deleted = false AND is_super = false
ORDER BY created_at DESC
LIMIT $3 OFFSET $4;
