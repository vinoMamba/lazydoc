package req

type CreateProjectReq struct {
	Name        string `json:"name" validate:"required,gte=2,lte=20"`
	Description string `json:"description"`
}

type UpdateProjectReq struct {
	Id          string `json:"id" validate:"required"`
	Name        string `json:"name" validate:"required,gte=2,lte=20"`
	Description string `json:"description"`
}
