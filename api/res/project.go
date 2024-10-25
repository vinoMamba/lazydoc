package res

type ProjectRes struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	IsPublic    bool   `json:"isPublic"`
	CreatedAt   string `json:"createdAt"`
	CreatedBy   string `json:"createdBy"`
}
