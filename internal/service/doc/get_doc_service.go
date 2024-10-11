package doc

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/gommon/log"
	"github.com/vinoMamba/lazydoc/api/res"
)

func (s *docService) GetDocListService(ctx fiber.Ctx, projectId string) ([]*res.DocItem, error) {
	list, err := s.Queries.GetDocListByProjectId(ctx.Context(), pgtype.Text{String: projectId, Valid: true})
	if err != nil {
		log.Errorf("[database] get doc list error: %v", err)
		return nil, errors.New("internal server error")
	}

	dl := sortDocListByPreDocId(list)

	return dl, nil
}

func (s *docService) GetDocListByParentIdService(ctx fiber.Ctx, parentId string) ([]*res.DocItem, error) {
	list, err := s.Queries.GetDocListByParentId(ctx.Context(), pgtype.Text{String: parentId, Valid: true})
	if err != nil {
		log.Errorf("[database] get doc list error: %v", err)
		return nil, errors.New("internal server error")
	}
	var dl []*res.DocItem
	for _, d := range list {
		item := &res.DocItem{
			Id:        d.ID,
			ParentId:  d.ParentID.String,
			Name:      d.Name,
			IsFolder:  d.IsFolder.Bool,
			IsPin:     d.IsPin.Bool,
			CreatedAt: d.CreatedAt.Time.Format(time.DateTime),
			CreatedBy: d.CreatedBy.String,
		}
		dl = append(dl, item)
	}
	return dl, nil
}
