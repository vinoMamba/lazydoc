package res

type LoginRes struct {
	Token string `json:"token"`
}

type UserInfoRes struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Avatar   string `json:"avatar"`
	UserId   string `json:"userId"`
}
