package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/internal/service/doc"
)

type DocHandler interface {
	GetDoc(c fiber.Ctx) error
	CreateDoc(c fiber.Ctx) error
	UpdateDoc(c fiber.Ctx) error
	DeleteDoc(c fiber.Ctx) error
	GetDocList(c fiber.Ctx) error
}

type docHandler struct {
	docService doc.DocService
}

func NewDocHandler(docService doc.DocService) DocHandler {
	return &docHandler{
		docService: docService,
	}
}

func (h *docHandler) GetDoc(c fiber.Ctx) error {
	docId := c.Params("docId")

	docItem, err := h.docService.GetDocService(c, docId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(docItem)
}

func (h *docHandler) CreateDoc(c fiber.Ctx) error {

	userId := GetUserIdFromLocals(c)

	params := new(req.CreateDocReq)

	if err := c.Bind().JSON(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	docItem, err := h.docService.CreateDocService(c, userId, params)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(docItem)
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

func (h *docHandler) DeleteDoc(c fiber.Ctx) error {

	userId := GetUserIdFromLocals(c)
	docId := c.Params("docId")

	if err := h.docService.DeleteDocService(c, userId, docId); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}

func (h *docHandler) GetDocList(c fiber.Ctx) error {
	projectId := c.Query("projectId")
	result, err := h.docService.GetDocListService(c, projectId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(result)
}
