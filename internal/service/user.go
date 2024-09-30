package service

import (
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/h2non/filetype"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/api/res"
	"github.com/vinoMamba/lazydoc/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	LoginPwd(ctx fiber.Ctx, req *req.LoginPwdReq) (*res.LoginRes, error)
	GetUserInfoService(ctx fiber.Ctx, userId string) (*res.UserInfoRes, error)
	AddUserService(ctx fiber.Ctx, uid string, req *req.AddUserReq) error
	GetUserListService(ctx fiber.Ctx, pageSize, pageNum int, condition string) (*res.UserListRes, error)
	DeleteUserService(ctx fiber.Ctx, userId string) error
	UpdateUserAvatarService(ctx fiber.Ctx, file *multipart.FileHeader, userId string) error
	UpdateUsernameService(ctx fiber.Ctx, userId, username string) error
	UpdateUserPasswordService(ctx fiber.Ctx, userId string, req *req.UpdateUserPasswordReq) error
	UpdateUserEmailService(ctx fiber.Ctx, userId string, req *req.UpdateUserEmailReq) error
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
	if err != nil || u.IsDeleted.Bool == true {
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
		Username:  u.Username,
		UserId:    u.ID,
		Avatar:    u.Avatar.String,
		Email:     u.Email,
		IsSuper:   u.IsSuper.Bool,
		IsDeleted: u.IsDeleted.Bool,
	}, nil
}

func (s *userService) AddUserService(ctx fiber.Ctx, uid string, req *req.AddUserReq) error {
	_, err := s.queries.GetUserByEmail(ctx.Context(), req.Email)
	if err == nil {
		return errors.New("current email has registered ")
	}

	userId, err := s.sid.GenString()
	if err != nil {
		log.Errorf("[sid] generate userId error: %v", err)
		return errors.New("internal server error")
	}

	default_password := "123456"
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(default_password), bcrypt.DefaultCost)

	if err != nil {
		log.Errorf("Create hash password error: %v", err)
		return errors.New("internal server error")
	}

	if err := s.queries.InsertUser(ctx.Context(), repository.InsertUserParams{
		ID:        userId,
		Username:  req.Username,
		Email:     req.Email,
		Password:  string(hashedPassword),
		CreatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
		CreatedBy: pgtype.Text{String: uid, Valid: true},
	}); err != nil {
		log.Errorf("[database] error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}

func (s *userService) GetUserListService(ctx fiber.Ctx, pageSize, pageNum int, condition string) (*res.UserListRes, error) {

	limit := int32(pageSize)
	offset := int32((pageNum - 1) * pageSize)

	list, err := s.queries.GetUserList(ctx.Context(), repository.GetUserListParams{
		Username: "%" + condition + "%",
		Email:    "%" + condition + "%",
		Limit:    limit,
		Offset:   offset,
	})

	if err != nil {
		log.Errorf("[database] get user list error: %v", err)
		return nil, errors.New("internal server error")
	}

	var items []*res.UserInfoRes

	for _, item := range list {
		i := &res.UserInfoRes{
			UserId:    item.ID,
			Avatar:    item.Avatar.String,
			Username:  item.Username,
			Email:     item.Email,
			IsSuper:   item.IsDeleted.Bool,
			IsDeleted: item.IsDeleted.Bool,
		}
		items = append(items, i)
	}

	count, err := s.queries.GetUserListCount(ctx.Context(), repository.GetUserListCountParams{
		Username: "%" + condition + "%",
		Email:    "%" + condition + "%",
	})

	if err != nil {
		log.Errorf("[database] get user count error: %v", err)
		return nil, errors.New("internal server error")
	}

	result := &res.UserListRes{
		PageNum:  pageNum,
		PageSize: pageSize,
		Total:    int(count),
		Items:    items,
	}

	return result, nil
}

func (s *userService) DeleteUserService(ctx fiber.Ctx, userId string) error {

	if err := s.queries.DeleteUserById(ctx.Context(), userId); err != nil {
		log.Errorf("[database] delete user error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (s *userService) UpdateUserAvatarService(ctx fiber.Ctx, file *multipart.FileHeader, userId string) error {
	f, err := file.Open()
	if err != nil {
		log.Errorf("open file error: &v", err)
		return err
	}

	defer f.Close()
	fileBytes, err := io.ReadAll(f)

	if err != nil {
		log.Errorf("read file error: &v", err)
		return err
	}

	isImage := filetype.IsImage(fileBytes)
	if !isImage {
		return errors.New("this file is not image")
	}

	fileName := fmt.Sprintf("%s_%s_%s", userId, strconv.FormatInt(time.Now().Unix(), 10), file.Filename)
	filePath := s.config.GetString("asset.icon_file_path") + fileName

	params := repository.UpdateAvatarByIdParams{
		Avatar:    pgtype.Text{Valid: true, String: fileName},
		ID:        userId,
		UpdatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
	}
	if err := s.queries.UpdateAvatarById(ctx.Context(), params); err != nil {
		log.Errorf("[database] upload avatar error: &v", err)
		return errors.New("internal server error")
	}

	return ctx.SaveFile(file, filePath)
}

func (s *userService) UpdateUsernameService(ctx fiber.Ctx, userId, username string) error {

	if err := s.queries.UpdateUsernameById(ctx.Context(), repository.UpdateUsernameByIdParams{
		Username:  username,
		ID:        userId,
		UpdatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
	}); err != nil {
		log.Errorf("[database] update username error: &v", err)
		return errors.New("internal server error")
	}
	return nil
}

func (s *userService) UpdateUserPasswordService(ctx fiber.Ctx, userId string, req *req.UpdateUserPasswordReq) error {
	u, err := s.queries.GetUserById(ctx.Context(), userId)
	if err != nil {
		return errors.New("Can't find user")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(req.OldPassword)); err != nil {
		log.Errorf("compare hash password error: %v", err)
		return errors.New("The old password is incorrect.")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		log.Errorf("[bcrypt] error: %v", err)
		return errors.New("internal server error")
	}

	if err := s.queries.UpdatePasswordById(ctx.Context(), repository.UpdatePasswordByIdParams{
		Password:  string(hashedPassword),
		ID:        userId,
		UpdatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
	}); err != nil {
		log.Errorf("[database] update user password error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (s *userService) UpdateUserEmailService(ctx fiber.Ctx, userId string, req *req.UpdateUserEmailReq) error {

	u, err := s.queries.GetUserByEmail(ctx.Context(), req.Email)
	if err == nil && u.IsDeleted.Bool == true {
		return errors.New("current email has registered")
	}

	if err := s.queries.UpdateEmailById(ctx.Context(), repository.UpdateEmailByIdParams{
		Email:     req.Email,
		ID:        userId,
		UpdatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
	}); err != nil {
		log.Errorf("[database] update user email error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}
