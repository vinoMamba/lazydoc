package service

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

type DocService interface {
	CreateDocService(ctx fiber.Ctx, userId string, req *req.CreateDocReq) error
	UpdateDocService(ctx fiber.Ctx, userId string, req *req.UpdateDocReq) error
}

type docService struct {
	*Service
}

func NewDocService(service *Service) DocService {
	return &docService{
		Service: service,
	}
}

func (s *docService) CreateDocService(ctx fiber.Ctx, userId string, req *req.CreateDocReq) error {

	_, err := s.queries.GetProjectById(ctx.Context(), req.ProjectId)
	if err != nil {
		log.Errorf("[database] select project error: %v", err)
		return errors.New("Current project is not exist")
	}

	docId, err := s.sid.GenString()

	if err != nil {
		log.Errorf("Create doc id error: %v", err)
		return errors.New("internal server error")
	}

	if err := s.queries.InsertDoc(ctx.Context(), repository.InsertDocParams{
		ID:        docId,
		Name:      req.Name,
		IsFolder:  pgtype.Bool{Bool: req.IsFolder, Valid: true},
		ProjectID: pgtype.Text{String: req.ProjectId, Valid: true},
		ParentID:  pgtype.Text{String: req.ProjectId, Valid: true},
		CreatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
		CreatedBy: pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] create doc error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}

func (s *docService) UpdateDocService(ctx fiber.Ctx, userId string, req *req.UpdateDocReq) error {
	if err := s.queries.UpdateDoc(ctx.Context(), repository.UpdateDocParams{
		ID:        req.Id,
		Name:      req.Name,
		ParentID:  pgtype.Text{String: req.ParentId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] update doc error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}
