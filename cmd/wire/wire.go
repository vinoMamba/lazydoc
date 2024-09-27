//go:build wireinject
// +build wireinject

package wire

import (
	"github.com/gofiber/fiber/v3"
	"github.com/google/wire"
	"github.com/spf13/viper"
	"github.com/vinoMamba/lazydoc/internal/handler"
	"github.com/vinoMamba/lazydoc/internal/repository"
	"github.com/vinoMamba/lazydoc/internal/server"
	"github.com/vinoMamba/lazydoc/internal/service"
	"github.com/vinoMamba/lazydoc/pkg/jwt"
	"github.com/vinoMamba/lazydoc/pkg/mail"
	"github.com/vinoMamba/lazydoc/pkg/redis"
	"github.com/vinoMamba/lazydoc/pkg/sid"
)

var serverSet = wire.NewSet(
	server.NewHttpServer,
)

var handlerSet = wire.NewSet(
	handler.NewUserHandler,
)

var serviceSet = wire.NewSet(
	service.NewService,
	service.NewUserService,

	repository.New,
	repository.NewConn,
	redis.NewRedisConn,
)

func NewApp(*viper.Viper) (*fiber.App, func(), error) {
	panic(wire.Build(
		serverSet,
		handlerSet,
		serviceSet,
		sid.NewSid,
		jwt.NewJWT,
		mail.NewMail,
	))
}
