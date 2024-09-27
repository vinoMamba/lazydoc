package service

import (
	"github.com/gofiber/fiber/v3"
)

type UserService interface {
	LoginPwd(ctx fiber.Ctx) error
}

type userService struct {
	*Service
}

func NewUserService(service *Service) UserService {
	return &userService{
		Service: service,
	}
}

func (s *userService) LoginPwd(ctx fiber.Ctx) error {
	return nil
}
