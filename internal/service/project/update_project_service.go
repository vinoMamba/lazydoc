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

func (s *projectService) UpdateProjectService(ctx fiber.Ctx, userId string, req *req.UpdateProjectReq) error {

	_, err := s.Queries.GetProjectById(ctx.Context(), req.Id)
	if err != nil {
		log.Errorf("[database] select project error: %v", err)
		return errors.New("current project is not exist")
	}

	if err := s.Queries.UpdateProject(ctx.Context(), repository.UpdateProjectParams{
		ID:          req.Id,
		Name:        req.Name,
		Description: pgtype.Text{String: req.Description, Valid: true},
		UpdatedAt:   pgtype.Timestamp{Time: time.Now(), Valid: true},
		IsPublic:    pgtype.Bool{Bool: req.IsPublic, Valid: true},
		UpdatedBy:   pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] update project error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}
