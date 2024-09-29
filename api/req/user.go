package req

type LoginPwdReq struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,gte=6,lte=20"`
}

type AddUserReq struct {
	Email    string `json:"email" validate:"required,email"`
	Username string `json:"username" validate:"required,gte=2,lte=10"`
}
