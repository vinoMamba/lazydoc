package project

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

func (s *projectService) DeleteProjectService(ctx fiber.Ctx, userId, projectId string) error {

	tx, err := s.Queries.NewDB().Begin(ctx.Context())
	if err != nil {
		return err
	}

	defer tx.Rollback(ctx.Context())
	qtx := s.Queries.WithTx(tx)

	if err := qtx.DeleteProject(ctx.Context(), repository.DeleteProjectParams{
		ID:        projectId,
		IsDeleted: pgtype.Bool{Bool: true, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] delete project error: %v", err)
		return errors.New("internal server error")
	}

	if err := qtx.DeleteProjectUserByProjectId(ctx.Context(), repository.DeleteProjectUserByProjectIdParams{
		IsDeleted: pgtype.Bool{Bool: true, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		ProjectID: projectId,
	}); err != nil {
		log.Errorf("[database] delete project user error: %v", err)
		return errors.New("internal server error")
	}

	return tx.Commit(ctx.Context())
}