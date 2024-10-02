package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/internal/service"
)

type DocHandler interface {
	CreateDoc(c fiber.Ctx) error
	UpdateDoc(c fiber.Ctx) error
}

type docHandler struct {
	docService service.DocService
}

func NewDocHandler(docService service.DocService) DocHandler {
	return &docHandler{
		docService: docService,
	}
}

func (h *docHandler) CreateDoc(c fiber.Ctx) error {

	userId := GetUserIdFromLocals(c)

	params := new(req.CreateDocReq)

	if err := c.Bind().JSON(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.docService.CreateDocService(c, userId, params); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *docHandler) UpdateDoc(c fiber.Ctx) error {
	userId := GetUserIdFromLocals(c)

	params := new(req.UpdateDocReq)

	if err := c.Bind().JSON(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := h.docService.UpdateDocService(c, userId, params); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}
