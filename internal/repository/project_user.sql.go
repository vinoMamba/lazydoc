// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: project_user.sql

package repository

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const insertProjectUser = `-- name: InsertProjectUser :exec
INSERT INTO project_users (
  id,user_id,project_id,permission,created_by, created_at
) VALUES (
  $1, $2, $3, $4, $5, $6
)
`

type InsertProjectUserParams struct {
	ID         string
	UserID     string
	ProjectID  string
	Permission NullPermissionLevel
	CreatedBy  pgtype.Text
	CreatedAt  pgtype.Timestamp
}

func (q *Queries) InsertProjectUser(ctx context.Context, arg InsertProjectUserParams) error {
	_, err := q.db.Exec(ctx, insertProjectUser,
		arg.ID,
		arg.UserID,
		arg.ProjectID,
		arg.Permission,
		arg.CreatedBy,
		arg.CreatedAt,
	)
	return err
}
