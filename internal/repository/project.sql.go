// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: project.sql

package repository

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const deleteProject = `-- name: DeleteProject :exec
UPDATE projects
SET
  is_deleted = $1, 
  updated_at = $2,
  updated_by = $3
WHERE id = $4
`

type DeleteProjectParams struct {
	IsDeleted pgtype.Bool
	UpdatedAt pgtype.Timestamp
	UpdatedBy pgtype.Text
	ID        string
}

func (q *Queries) DeleteProject(ctx context.Context, arg DeleteProjectParams) error {
	_, err := q.db.Exec(ctx, deleteProject,
		arg.IsDeleted,
		arg.UpdatedAt,
		arg.UpdatedBy,
		arg.ID,
	)
	return err
}

const getProjectById = `-- name: GetProjectById :one
SELECT id, name, description, is_deleted, is_public, created_by, created_at, updated_by, updated_at FROM projects WHERE id = $1 AND is_deleted = false
`

func (q *Queries) GetProjectById(ctx context.Context, id string) (Project, error) {
	row := q.db.QueryRow(ctx, getProjectById, id)
	var i Project
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Description,
		&i.IsDeleted,
		&i.IsPublic,
		&i.CreatedBy,
		&i.CreatedAt,
		&i.UpdatedBy,
		&i.UpdatedAt,
	)
	return i, err
}

const getProjectList = `-- name: GetProjectList :many
(SELECT id, name, description, is_deleted, is_public, created_by, created_at, updated_by, updated_at FROM projects as pa WHERE pa.is_deleted = false AND pa.is_public = true AND pa.name LIKE $1)
UNION
(SELECT id, name, description, is_deleted, is_public, created_by, created_at, updated_by, updated_at FROM projects as pb WHERE pb.created_by = $2 AND pb.is_deleted = false AND pb.is_public = false AND pb.name LIKE $1)
ORDER BY created_at DESC
`

type GetProjectListParams struct {
	Name      string
	CreatedBy pgtype.Text
}

func (q *Queries) GetProjectList(ctx context.Context, arg GetProjectListParams) ([]Project, error) {
	rows, err := q.db.Query(ctx, getProjectList, arg.Name, arg.CreatedBy)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Project
	for rows.Next() {
		var i Project
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Description,
			&i.IsDeleted,
			&i.IsPublic,
			&i.CreatedBy,
			&i.CreatedAt,
			&i.UpdatedBy,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const insertProject = `-- name: InsertProject :exec
INSERT INTO projects (
  id,name,description,is_public,created_at,created_by
) VALUES (
  $1, $2, $3, $4, $5, $6
)
`

type InsertProjectParams struct {
	ID          string
	Name        string
	Description pgtype.Text
	IsPublic    pgtype.Bool
	CreatedAt   pgtype.Timestamp
	CreatedBy   pgtype.Text
}

func (q *Queries) InsertProject(ctx context.Context, arg InsertProjectParams) error {
	_, err := q.db.Exec(ctx, insertProject,
		arg.ID,
		arg.Name,
		arg.Description,
		arg.IsPublic,
		arg.CreatedAt,
		arg.CreatedBy,
	)
	return err
}

const updateProject = `-- name: UpdateProject :exec
UPDATE projects
SET
  name = $1,
  description = $2,
  updated_at = $3,
  updated_by = $4,
  is_public = $5
WHERE id = $6
`

type UpdateProjectParams struct {
	Name        string
	Description pgtype.Text
	UpdatedAt   pgtype.Timestamp
	UpdatedBy   pgtype.Text
	IsPublic    pgtype.Bool
	ID          string
}

func (q *Queries) UpdateProject(ctx context.Context, arg UpdateProjectParams) error {
	_, err := q.db.Exec(ctx, updateProject,
		arg.Name,
		arg.Description,
		arg.UpdatedAt,
		arg.UpdatedBy,
		arg.IsPublic,
		arg.ID,
	)
	return err
}
