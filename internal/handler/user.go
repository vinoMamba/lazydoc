package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/internal/service"
)

type UserHandler interface {
	LoginPwd(c fiber.Ctx) error
}

type userHandler struct {
	userService service.UserService
}

func NewUserHandler(userService service.UserService) UserHandler {
	return &userHandler{
		userService: userService,
	}
}

func (u *userHandler) LoginPwd(c fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(nil)
}
