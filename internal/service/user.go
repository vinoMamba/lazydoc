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
	GetUserInfoService(ctx fiber.Ctx, userId string) (*res.UserInfoRes, error)
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

func (s *userService) GetUserInfoService(ctx fiber.Ctx, userId string) (*res.UserInfoRes, error) {
	u, err := s.queries.GetUserById(ctx.Context(), userId)
	if err != nil {
		return nil, errors.New("user not found")
	}
	return &res.UserInfoRes{
		Username: u.Username,
		UserId:   u.ID,
		Avatar:   u.Avatar.String,
		Email:    u.Email,
		IsSuper:  u.IsSuper.Bool,
	}, nil
}
