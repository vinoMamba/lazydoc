package res

type DocItem struct {
	Id        string `json:"id"`
	ParentId  string `json:"parentId"`
	Name      string `json:"name"`
	IsFolder  bool   `json:"isFolder"`
	IsPin     bool   `json:"isPin"`
	CreatedAt string `json:"createdAt"`
	CreatedBy string `json:"createdBy"`
}
