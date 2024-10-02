package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/internal/service"
)

type DocHandler interface {
	CreateDoc(c fiber.Ctx) error
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
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}
