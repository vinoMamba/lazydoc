-- name: InsertProjectUser :exec
INSERT INTO project_users (
  id,user_id,project_id,permission,created_by, created_at
) VALUES (
  $1, $2, $3, $4, $5, $6
);
