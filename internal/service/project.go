package service

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/api/res"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

type ProjectService interface {
	CreateProjectService(ctx fiber.Ctx, userId string, req *req.CreateProjectReq) error
	UpdateProjectService(ctx fiber.Ctx, userId string, req *req.UpdateProjectReq) error
	GetProjectListService(ctx fiber.Ctx, userId, projectName string) ([]*res.ProjectRes, error)
	GetProjectInfoService(ctx fiber.Ctx, projectId string) (*res.ProjectRes, error)
	DeleteProjectService(ctx fiber.Ctx, userId, projectId string) error
}

type projectService struct {
	*Service
}

func NewProjectService(service *Service) ProjectService {
	return &projectService{
		Service: service,
	}
}

func (s *projectService) CreateProjectService(ctx fiber.Ctx, userId string, req *req.CreateProjectReq) error {
	tx, err := s.queries.NewDB().Begin(ctx.Context())

	if err != nil {
		return err
	}
	defer tx.Rollback(ctx.Context())
	qtx := s.queries.WithTx(tx)

	projectId, err := s.sid.GenString()

	if err != nil {
		log.Errorf("Create project id error: %v", err)
		return errors.New("internal server error")
	}

	if err := qtx.InsertProject(ctx.Context(), repository.InsertProjectParams{
		ID:          projectId,
		Name:        req.Name,
		Description: pgtype.Text{String: req.Description, Valid: true},
		CreatedAt:   pgtype.Timestamp{Valid: true, Time: time.Now()},
		CreatedBy:   pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] insert project error: %v", err)
		return errors.New("internal server error")
	}

	projectUserId, err := s.sid.GenString()

	if err != nil {
		log.Errorf("Create project user id error: %v", err)
		return errors.New("internal server error")
	}

	if err := s.queries.InsertProjectUser(ctx.Context(), repository.InsertProjectUserParams{
		ID:         projectUserId,
		ProjectID:  projectId,
		UserID:     userId,
		Permission: repository.NullPermissionLevel{PermissionLevel: repository.PermissionLevelAdmin, Valid: true},
		CreatedAt:  pgtype.Timestamp{Valid: true, Time: time.Now()},
		CreatedBy:  pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] insert project user error: %v", err)
		return errors.New("internal server error")
	}

	return tx.Commit(ctx.Context())
}

func (s *projectService) UpdateProjectService(ctx fiber.Ctx, userId string, req *req.UpdateProjectReq) error {

	_, err := s.queries.GetProjectById(ctx.Context(), req.Id)
	if err != nil {
		log.Errorf("[database] select project error: %v", err)
		return errors.New("Current project is not exist")
	}

	if err := s.queries.UpdateProject(ctx.Context(), repository.UpdateProjectParams{
		ID:          req.Id,
		Name:        req.Name,
		Description: pgtype.Text{String: req.Description, Valid: true},
		UpdatedAt:   pgtype.Timestamp{Time: time.Now(), Valid: true},
		UpdatedBy:   pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] update project error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}

func (s *projectService) GetProjectListService(ctx fiber.Ctx, userId, projectName string) ([]*res.ProjectRes, error) {
	name := "%" + projectName + "%"
	list, err := s.queries.GetProjectList(ctx.Context(), repository.GetProjectListParams{
		Name:   name,
		UserID: userId,
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
			Description: p.Description.String,
			CreatedAt:   p.CreatedAt.Time.Format(time.DateTime),
		}
		pl = append(pl, item)
	}

	return pl, nil
}

func (s *projectService) GetProjectInfoService(ctx fiber.Ctx, projectId string) (*res.ProjectRes, error) {
	p, err := s.queries.GetProjectById(ctx.Context(), projectId)
	if err != nil {
		log.Errorf("[database] delete project error: %v", err)
		return nil, errors.New("internal server error")
	}
	return &res.ProjectRes{
		Id:          p.ID,
		Name:        p.Name,
		Description: p.Description.String,
		CreatedAt:   p.CreatedAt.Time.Format(time.DateTime),
	}, nil
}

func (s *projectService) DeleteProjectService(ctx fiber.Ctx, userId, projectId string) error {

	tx, err := s.queries.NewDB().Begin(ctx.Context())
	if err != nil {
		return err
	}

	defer tx.Rollback(ctx.Context())
	qtx := s.queries.WithTx(tx)

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
