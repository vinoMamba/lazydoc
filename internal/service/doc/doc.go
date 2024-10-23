package doc

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/api/res"
	"github.com/vinoMamba/lazydoc/internal/service"
)

type DocService interface {
	GetDocService(ctx fiber.Ctx, docId string) (*res.DocItem, error)
	CreateDocService(ctx fiber.Ctx, userId string, req *req.CreateDocReq) (string, error)
	UpdateDocService(ctx fiber.Ctx, userId string, req *req.UpdateDocReq) error
	DeleteDocService(ctx fiber.Ctx, userId, docId string) error
	GetDocListService(ctx fiber.Ctx, projectId string) ([]*res.DocItem, error)
}

type docService struct {
	*service.Service
}

func NewDocService(service *service.Service) DocService {
	return &docService{
		Service: service,
	}
}
