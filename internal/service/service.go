package service

import (
	"github.com/spf13/viper"
	"github.com/vinoMamba/lazydoc/internal/repository"
	"github.com/vinoMamba/lazydoc/pkg/jwt"
	"github.com/vinoMamba/lazydoc/pkg/mail"
	"github.com/vinoMamba/lazydoc/pkg/redis"
	"github.com/vinoMamba/lazydoc/pkg/sid"
)

type Service struct {
	Queries *repository.Queries
	Sid     *sid.Sid
	Jwt     *jwt.JWT
	Config  *viper.Viper
	Mail    *mail.Mail
	Redis   *redis.RedisInternal
}

func NewService(queries *repository.Queries, sid *sid.Sid, jwt *jwt.JWT, config *viper.Viper, mail *mail.Mail, redis *redis.RedisInternal) *Service {

	return &Service{
		Queries: queries,
		Sid:     sid,
		Jwt:     jwt,
		Config:  config,
		Mail:    mail,
		Redis:   redis,
	}
}
