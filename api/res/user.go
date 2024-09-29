package res

type LoginRes struct {
	Token string `json:"token"`
}

type UserInfoRes struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Avatar   string `json:"avatar"`
	UserId   string `json:"userId"`
	IsSuper  bool   `json:"isSuper"`
}

type UserListRes struct {
	PageNum  int            `json:"pageNum"`
	PageSize int            `json:"pageSize"`
	Total    int            `json:"total"`
	Items    []*UserInfoRes `json:"items"`
}
