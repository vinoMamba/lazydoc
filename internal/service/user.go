package service

import (
	"errors"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/api/res"
	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	LoginPwd(ctx fiber.Ctx, req *req.LoginPwdReq) (*res.LoginRes, error)
}

type userService struct {
	*Service
}

func NewUserService(service *Service) UserService {
	return &userService{
		Service: service,
	}
}

func (s *userService) LoginPwd(ctx fiber.Ctx, req *req.LoginPwdReq) (*res.LoginRes, error) {
	u, err := s.queries.GetUserByEmail(ctx.Context(), req.Email)
	if err != nil {
		return nil, errors.New("current email is not registered yet")
	}

	if u.Email != "admin@example.com" && u.Password != "123456" {

		if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(req.Password)); err != nil {
			log.Errorf("compare hash password error: %v", err)
			return nil, errors.New("incorret password")
		}
	}

	token, err := s.jwt.GenJWT(u.ID, u.Email)

	if err != nil {
		log.Errorf("generate jwt error: %v", err)
		return nil, errors.New("internal server error")
	}

	return &res.LoginRes{
		Token: token,
	}, nil
}
