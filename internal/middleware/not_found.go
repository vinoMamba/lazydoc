package middleware

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
)

type ReturnType = func(c fiber.Ctx) error

func NotFound() ReturnType {
	return func(c fiber.Ctx) error {
		log.Errorf("bad request: %v . request method: %v", c.Path(), c.Method())
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "internal server",
		})
	}
}
