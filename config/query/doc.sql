-- name: InsertDoc :exec
INSERT INTO documents (
  id,parent_id,project_id,name,is_folder,created_at,created_by
) VALUES (
  $1, $2, $3, $4, $5, $6, $7
);

-- name: UpdateDoc :exec
UPDATE documents 
SET
  name = $1,
  parent_id = $2,
  updated_at = $3,
  updated_by = $4
WHERE id = $5;

-- name: DeleteDoc :exec
UPDATE documents 
SET
  is_deleted = $1, 
  updated_at = $2,
  updated_by = $3
WHERE id = $4;