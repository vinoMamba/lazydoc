package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/internal/service"
)

type ProjectHandler interface {
	CreateProject(c fiber.Ctx) error
	UpdateProject(c fiber.Ctx) error
	GetProjectList(c fiber.Ctx) error
}

type projectHandler struct {
	projectService service.ProjectService
}

func NewProjectHandler(projectService service.ProjectService) ProjectHandler {
	return &projectHandler{
		projectService: projectService,
	}
}

func (h *projectHandler) CreateProject(c fiber.Ctx) error {
	userId := GetUserIdFromLocals(c)
	params := new(req.CreateProjectReq)

	if err := c.Bind().JSON(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.projectService.CreateProjectService(c, userId, params); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *projectHandler) UpdateProject(c fiber.Ctx) error {
	userId := GetUserIdFromLocals(c)
	params := new(req.UpdateProjectReq)

	if err := c.Bind().JSON(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.projectService.UpdateProjectService(c, userId, params); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *projectHandler) GetProjectList(c fiber.Ctx) error {
	name := c.Query("name")

	result, err := h.projectService.GetProjectListService(c, name)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(result)
}
