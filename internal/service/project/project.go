package project

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/api/res"
	"github.com/vinoMamba/lazydoc/internal/service"
)

type ProjectService interface {
	CreateProjectService(ctx fiber.Ctx, userId string, req *req.CreateProjectReq) error
	UpdateProjectService(ctx fiber.Ctx, userId string, req *req.UpdateProjectReq) error
	GetProjectListService(ctx fiber.Ctx, userId, projectName string) ([]*res.ProjectRes, error)
	GetProjectInfoService(ctx fiber.Ctx, projectId string) (*res.ProjectRes, error)
	DeleteProjectService(ctx fiber.Ctx, userId, projectId string) error
}

type projectService struct {
	*service.Service
}

func NewProjectService(service *service.Service) ProjectService {
	return &projectService{
		Service: service,
	}
}
