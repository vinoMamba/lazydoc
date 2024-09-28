package server

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/internal/handler"
	"github.com/vinoMamba/lazydoc/internal/middleware"
	"github.com/vinoMamba/lazydoc/pkg/jwt"
)

type structValidator struct {
	validate *validator.Validate
}

func (v *structValidator) Validate(out any) error {
	return v.validate.Struct(out)
}

func (v *structValidator) ValidateStruct(out any) error {
	return v.validate.Struct(out)
}

func (v *structValidator) Engine() any {
	return nil
}

func NewHttpServer(
	userHandler handler.UserHandler,
	jwt *jwt.JWT,
) *fiber.App {
	app := fiber.New(fiber.Config{
		StructValidator: &structValidator{validate: validator.New()},
	})

	app.Post("/login/password", userHandler.LoginPwd)

	user := app.Group("/user")
	user.Use(middleware.JWTMiddleware(jwt))
	user.Get("/info", userHandler.GetUserInfo)

	app.Use(middleware.NotFound())
	return app
}
