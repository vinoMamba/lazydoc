-- name: InsertProject :exec
INSERT INTO projects (
  id,name,description,is_public,created_at,created_by
) VALUES (
  $1, $2, $3, $4, $5, $6
);

-- name: UpdateProject :exec
UPDATE projects
SET
  name = $1,
  description = $2,
  updated_at = $3,
  updated_by = $4,
  is_public = $5
WHERE id = $6;

-- name: DeleteProject :exec
UPDATE projects
SET
  is_deleted = $1, 
  updated_at = $2,
  updated_by = $3
WHERE id = $4;

-- name: GetProjectById :one
SELECT * FROM projects WHERE id = $1 AND is_deleted = false;

-- name: GetProjectList :many
(SELECT * FROM projects as pa WHERE pa.is_deleted = false AND pa.is_public = true AND pa.name LIKE $1)
UNION
(SELECT * FROM projects as pb WHERE pb.created_by = $2 AND pb.is_deleted = false AND pb.is_public = false AND pb.name LIKE $1)
ORDER BY created_at DESC;
