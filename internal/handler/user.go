package handler

import (
	"strconv"

	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/internal/service"
)

type UserHandler interface {
	LoginPwd(c fiber.Ctx) error
	GetUserInfo(c fiber.Ctx) error
	GetUserList(c fiber.Ctx) error
	AddUser(c fiber.Ctx) error
}

type userHandler struct {
	userService service.UserService
}

func NewUserHandler(userService service.UserService) UserHandler {
	return &userHandler{
		userService: userService,
	}
}

func (u *userHandler) LoginPwd(c fiber.Ctx) error {
	params := new(req.LoginPwdReq)
	if err := c.Bind().JSON(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	result, err := u.userService.LoginPwd(c, params)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(result)
}

func (u *userHandler) GetUserInfo(c fiber.Ctx) error {
	userId := GetUserIdFromLocals(c)
	userInfo, err := u.userService.GetUserInfoService(c, userId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(userInfo)
}

func (u *userHandler) GetUserList(c fiber.Ctx) error {
	queris := c.Queries()

	pageSizeStr := queris["pageSize"]

	pageSize, err := strconv.Atoi(pageSizeStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "pageSize is required",
		})
	}

	pageNumStr := queris["pageNum"]
	pageNum, err := strconv.Atoi(pageNumStr)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "pageSize and pageNum is required",
		})
	}

	result, err := u.userService.GetUserListService(c, pageSize, pageNum, queris["condition"])

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(result)
}

func (u *userHandler) AddUser(c fiber.Ctx) error {
	uid := GetUserIdFromLocals(c)
	params := new(req.AddUserReq)
	if err := c.Bind().JSON(params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	if err := u.userService.AddUserService(c, uid, params); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "ok",
	})
}
