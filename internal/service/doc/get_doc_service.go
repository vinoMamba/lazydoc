package doc

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/gommon/log"
	"github.com/vinoMamba/lazydoc/api/res"
)

func (s *docService) GetDocService(ctx fiber.Ctx, docId string) (*res.DocItem, error) {
	item, err := s.Queries.GetDocById(ctx.Context(), docId)
	if err != nil {
		log.Errorf("[database] get doc list error: %v", err)
		return nil, errors.New("internal server error")
	}

	return &res.DocItem{
		Id:          item.ID,
		Name:        item.Name,
		PreDocId:    item.PreDocID.String,
		ParentId:    item.ParentID.String,
		IsFolder:    item.IsFolder.Bool,
		IsPin:       item.IsPin.Bool,
		HasChildren: item.HasChildren.Bool,
		CreatedAt:   item.CreatedAt.Time.Format(time.DateOnly),
		CreatedBy:   item.CreatedBy.String,
	}, nil
}

func (s *docService) GetDocListService(ctx fiber.Ctx, projectId string) ([]*res.DocItem, error) {
	list, err := s.Queries.GetDocListByProjectId(ctx.Context(), pgtype.Text{String: projectId, Valid: true})
	if err != nil {
		log.Errorf("[database] get doc list error: %v", err)
		return nil, errors.New("internal server error")
	}
	var itemList []*res.DocItem

	for _, item := range list {
		itemList = append(itemList, &res.DocItem{
			Id:          item.ID,
			Name:        item.Name,
			PreDocId:    item.PreDocID.String,
			ParentId:    item.ParentID.String,
			IsFolder:    item.IsFolder.Bool,
			IsPin:       item.IsPin.Bool,
			HasChildren: item.HasChildren.Bool,
			Children:    []*res.DocItem{},
			CreatedAt:   item.CreatedAt.Time.Format(time.DateOnly),
			CreatedBy:   item.CreatedBy.String,
		})
	}

	itemMap := genItemMap(itemList)
	result := buildTree(itemMap)

	return result, nil
}
