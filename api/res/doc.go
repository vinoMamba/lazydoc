package res

type DocItem struct {
	Id        string     `json:"id"`
	ParentId  string     `json:"parentId"`
	PreDocId  string     `json:"preDocId"`
	Name      string     `json:"name"`
	IsFolder  bool       `json:"isFolder"`
	CreatedAt string     `json:"createdAt"`
	CreatedBy string     `json:"createdBy"`
	Children  []*DocItem `json:"children"`
}
