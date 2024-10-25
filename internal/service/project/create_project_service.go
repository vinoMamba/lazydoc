package project

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

func (s *projectService) CreateProjectService(ctx fiber.Ctx, userId string, req *req.CreateProjectReq) error {
	tx, err := s.Queries.NewDB().Begin(ctx.Context())

	if err != nil {
		return err
	}
	defer tx.Rollback(ctx.Context())
	qtx := s.Queries.WithTx(tx)

	projectId, err := s.Sid.GenString()

	if err != nil {
		log.Errorf("Create project id error: %v", err)
		return errors.New("internal server error")
	}

	if err := qtx.InsertProject(ctx.Context(), repository.InsertProjectParams{
		ID:          projectId,
		Name:        req.Name,
		IsPublic:    pgtype.Bool{Bool: req.IsPublic, Valid: true},
		Description: pgtype.Text{String: req.Description, Valid: true},
		CreatedAt:   pgtype.Timestamp{Valid: true, Time: time.Now()},
		CreatedBy:   pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] insert project error: %v", err)
		return errors.New("internal server error")
	}

	return tx.Commit(ctx.Context())
}
