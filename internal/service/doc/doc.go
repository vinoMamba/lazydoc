package doc

import (
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/api/res"
	"github.com/vinoMamba/lazydoc/internal/repository"
	"github.com/vinoMamba/lazydoc/internal/service"
)

type DocService interface {
	CreateDocService(ctx fiber.Ctx, userId string, req *req.CreateDocReq) (string, error)
	UpdateDocService(ctx fiber.Ctx, userId string, req *req.UpdateDocReq) error
	DeleteDocService(ctx fiber.Ctx, userId, docId string) error
	GetDocListService(ctx fiber.Ctx, projectId string) ([]*res.DocItem, error)
	GetDocListByParentIdService(ctx fiber.Ctx, parentId string) ([]*res.DocItem, error)
}

type docService struct {
	*service.Service
}

func NewDocService(service *service.Service) DocService {
	return &docService{
		Service: service,
	}
}

func sortDocListByPreDocId(list []repository.Document) []*res.DocItem {
	sortedArray := make([]*res.DocItem, 0)
	idMap := make(map[string]*repository.Document)

	for _, item := range list {
		if item.PreDocID.String != "" {
			idMap[item.PreDocID.String] = &item
		}
	}
	for _, item := range list {
		if item.PreDocID.String == "" {
			current := &res.DocItem{
				Id:          item.ID,
				ParentId:    item.ParentID.String,
				PreDocId:    item.PreDocID.String,
				Name:        item.Name,
				IsFolder:    item.IsDeleted.Bool,
				IsPin:       item.IsPin.Bool,
				HasChildren: item.HasChildren.Bool,
				CreatedAt:   item.CreatedAt.Time.Format(time.DateTime),
				CreatedBy:   item.CreatedBy.String,
			}
			sortedArray = append(sortedArray, current)

			nextId := current.Id

			for idMap[nextId] != nil {
				currentItem := idMap[nextId]
				current = &res.DocItem{
					Id:          currentItem.ID,
					ParentId:    currentItem.ParentID.String,
					PreDocId:    currentItem.PreDocID.String,
					Name:        currentItem.Name,
					IsFolder:    currentItem.IsDeleted.Bool,
					IsPin:       currentItem.IsPin.Bool,
					HasChildren: currentItem.HasChildren.Bool,
					CreatedAt:   currentItem.CreatedAt.Time.Format(time.DateTime),
					CreatedBy:   currentItem.CreatedBy.String,
				}

				sortedArray = append(sortedArray, current)

				if current.PreDocId == "" {
					break
				}
				nextId = current.Id
			}
			break
		}

	}

	return sortedArray
}
