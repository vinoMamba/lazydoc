package res

type DocItem struct {
	Id          string `json:"id"`
	ParentId    string `json:"parentId"`
	PreDocId    string `json:"preDocId"`
	Name        string `json:"name"`
	IsFolder    bool   `json:"isFolder"`
	IsPin       bool   `json:"isPin"`
	HasChildren bool   `json:"hasChildren"`
	CreatedAt   string `json:"createdAt"`
	CreatedBy   string `json:"createdBy"`
}
