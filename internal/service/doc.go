package service

import (
	"github.com/gofiber/fiber/v3"
)

type DocService interface {
	CreateDocService(ctx fiber.Ctx, userId, projectId string) error
}

type docService struct {
	*Service
}

func NewDocService(service *Service) DocService {
	return &docService{
		Service: service,
	}
}

func (s *docService) CreateDocService(ctx fiber.Ctx, userId, projectId string) error {
	return nil
}
