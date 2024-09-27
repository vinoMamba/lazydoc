package middleware

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/vinoMamba/lazydoc/pkg/jwt"
)

type contextKey string

const UserKey contextKey = "user"

func JWTMiddleware(jwt *jwt.JWT) fiber.Handler {
	return func(c fiber.Ctx) error {
		token := c.Get("Authorization")
		if len(token) > 0 {
			claims, err := jwt.ParseToken(token)
			if err != nil {
				log.Errorf("Token error:%v", err)
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"message": "unauthorized",
				})
			}
			c.Locals(UserKey, claims)
			return c.Next()
		} else {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "unauthorized",
			})
		}
	}
}
