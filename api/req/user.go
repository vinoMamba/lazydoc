package req

type LoginPwdReq struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,gte=6,lte=20"`
}

type AddUserReq struct {
	Email    string `json:"email" validate:"required,email"`
	Username string `json:"username" validate:"required,gte=2,lte=10"`
}

type UpdateUsernameReq struct {
	Username string `json:"username" validate:"required,gte=2,lte=10"`
}

type UpdateUserPasswordReq struct {
	OldPassword string `json:"oldPassword" validate:"required,gte=6,lte=20"`
	NewPassword string `json:"newPassword" validate:"required,gte=6,lte=20"`
}

type UpdateUserEmailReq struct {
	Email string `json:"email" validate:"required,email"`
}
