-- name: InsertProjectUser :exec
INSERT INTO project_users (
  id,user_id,project_id,permission,created_by, created_at
) VALUES (
  $1, $2, $3, $4, $5, $6
);

-- name: DeleteProjectUserByProjectId :exec
UPDATE project_users
SET
  is_deleted = $1, 
  updated_at = $2,
  updated_by = $3
WHERE project_id = $4;
