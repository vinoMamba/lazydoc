package req

type CreateDocReq struct {
	ParentId  string `json:"parentId"`
	ProjectId string `json:"projectId"`
	Name      string `json:"name"`
	IsFolder  bool   `json:"isFolder"`
}

type UpdateDocReq struct {
	Id       string `json:"id"`
	ParentId string `json:"parentId"`
	Name     string `json:"name"`
}
