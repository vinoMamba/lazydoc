package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/internal/middleware"
	"github.com/vinoMamba/lazydoc/pkg/jwt"
)

func GetUserIdFromLocals(c fiber.Ctx) string {
	user := c.Locals(middleware.UserKey)
	return user.(*jwt.CustomClaims).UserId
}

func GetSpaceIdFromLocals(c fiber.Ctx) string {
	user := c.Locals(middleware.UserKey)
	return user.(*jwt.CustomClaims).ActiveSpaceId
}
