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

-- name: GetDocListByProjectId :many
SELECT * FROM documents WHERE project_id = $1 AND (parent_id IS NULL OR parent_id = '' ) AND is_deleted = false;

-- name: UpdateDocPreDocId :exec
UPDATE documents 
SET pre_doc_id = $1 WHERE id = $2;

-- name: GetFirstDocByParentId :one
SELECT * FROM documents WHERE parent_id = $1 AND (pre_doc_id IS NULL OR pre_doc_id = '' ) AND is_deleted = false;

-- name: GetDocListByParentId :many
SELECT * FROM documents WHERE parent_id = $1 AND is_deleted = false;


-- name: GetDocById :one
SELECT * FROM documents WHERE id = $1 AND is_deleted = false;
-- name: GetDocByPreDocId :one
SELECT * FROM documents WHERE pre_doc_id = $1 AND is_deleted = false;
