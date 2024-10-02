-- name: InsertProject :exec
INSERT INTO projects (
  id,name,description,created_at,created_by
) VALUES (
  $1, $2, $3, $4, $5
);

-- name: UpdateProject :exec
UPDATE projects
SET
  name = $1,
  description = $2,
  updated_at = $3,
  updated_by = $4
WHERE id = $5;

-- name: DeleteProject :exec
UPDATE projects
SET
  is_deleted = $1, 
  updated_at = $2,
  updated_by = $3
WHERE id = $3;

-- name: GetProjectById :one
SELECT * FROM projects WHERE id = $1 AND is_deleted = false;

-- name: GetProjectList :many
SELECT * 
FROM projects AS p 
JOIN project_users AS pu 
ON p.id = pu.project_id
WHERE p.name LIKE $1 AND p.is_deleted = false AND pu.user_id = $2
ORDER BY p.created_at DESC;
