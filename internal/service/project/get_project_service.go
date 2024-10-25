package project

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazydoc/api/res"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

func (s *projectService) GetProjectListService(ctx fiber.Ctx, userId, projectName string) ([]*res.ProjectRes, error) {
	name := "%" + projectName + "%"
	list, err := s.Queries.GetProjectList(ctx.Context(), repository.GetProjectListParams{
		Name:      name,
		CreatedBy: pgtype.Text{String: userId, Valid: true},
	})

	if err != nil {
		log.Errorf("[database] get project list error: %v", err)
		return nil, errors.New("internal server error")
	}

	var pl []*res.ProjectRes

	for _, p := range list {
		item := &res.ProjectRes{
			Id:          p.ID,
			Name:        p.Name,
			IsPublic:    p.IsPublic.Bool,
			Description: p.Description.String,
			CreatedAt:   p.CreatedAt.Time.Format(time.DateTime),
			CreatedBy:   p.CreatedBy.String,
		}
		pl = append(pl, item)
	}

	return pl, nil
}

func (s *projectService) GetProjectInfoService(ctx fiber.Ctx, projectId string) (*res.ProjectRes, error) {
	p, err := s.Queries.GetProjectById(ctx.Context(), projectId)
	if err != nil {
		log.Errorf("[database] delete project error: %v", err)
		return nil, errors.New("internal server error")
	}
	return &res.ProjectRes{
		Id:          p.ID,
		Name:        p.Name,
		IsPublic:    p.IsPublic.Bool,
		Description: p.Description.String,
		CreatedAt:   p.CreatedAt.Time.Format(time.DateTime),
		CreatedBy:   p.CreatedBy.String,
	}, nil
}
