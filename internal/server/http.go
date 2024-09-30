package server

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/static"
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

	//upload file
	app.Get("/upload/icon/*", static.New("./storage/icons"))

	app.Post("/login/password", userHandler.LoginPwd)

	user := app.Group("/user")
	user.Use(middleware.JWTMiddleware(jwt))
	user.Post("", userHandler.AddUser)
	user.Put("/password", userHandler.UpdateUserPassword)
	user.Put("/username", userHandler.UpdateUsername)
	user.Put("/email", userHandler.UpdateUserEmail)
	user.Post("/avatar", userHandler.UpdateUserAvatar)
	user.Delete("", userHandler.DeleteUser)
	user.Get("/info", userHandler.GetUserInfo)
	user.Get("/list", userHandler.GetUserList)

	app.Use(middleware.NotFound())
	return app
}
