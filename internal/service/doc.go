package service

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/gommon/log"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/api/res"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

type DocService interface {
	CreateDocService(ctx fiber.Ctx, userId string, req *req.CreateDocReq) (string, error)
	UpdateDocService(ctx fiber.Ctx, userId string, req *req.UpdateDocReq) error
	DeleteDocService(ctx fiber.Ctx, userId, docId string) error
	GetDocListService(ctx fiber.Ctx, projectId string) ([]*res.DocItem, error)
	GetDocListByParentIdService(ctx fiber.Ctx, parentId string) ([]*res.DocItem, error)
}

type docService struct {
	*Service
}

func NewDocService(service *Service) DocService {
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

	log.Infof("map:%v", idMap)

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

// NOTE:  新增文件会添加到当前parentID 的children 的第一个。因此会更新旧的第一个节点的pre_doc_id 为当前新节点的id

func (s *docService) CreateDocService(ctx fiber.Ctx, userId string, req *req.CreateDocReq) (string, error) {

	tx, err := s.queries.NewDB().Begin(ctx.Context())
	if err != nil {
		return "", err
	}

	defer tx.Rollback(ctx.Context())
	qtx := s.queries.WithTx(tx)

	docId, err := s.sid.GenString()

	if err != nil {
		log.Errorf("Create doc id error: %v", err)
		return "", errors.New("internal server error")
	}

	if err := qtx.InsertDoc(ctx.Context(), repository.InsertDocParams{
		ID:        docId,
		Name:      req.Name,
		IsFolder:  pgtype.Bool{Bool: req.IsFolder, Valid: true},
		ProjectID: pgtype.Text{String: req.ProjectId, Valid: true},
		ParentID:  pgtype.Text{String: req.ParentId, Valid: true},
		CreatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
		CreatedBy: pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] create doc error: %v", err)
		return "", errors.New("internal server error")
	}

	first, err := qtx.GetFirstDocByParentId(ctx.Context(), pgtype.Text{String: req.ParentId, Valid: true})

	if err != nil {
		log.Errorf("[database] get first doc by parent id error: %v", err)
		return "", errors.New("internal server error")
	}

	if first.ID != docId {
		if err := qtx.UpdateDocPreDocId(ctx.Context(), repository.UpdateDocPreDocIdParams{
			ID:       first.ID,
			PreDocID: pgtype.Text{String: docId, Valid: true},
		}); err != nil {
			log.Errorf("[database] update doc pre doc id error: %v", err)
			return "", errors.New("internal server error")
		}
	}

	return docId, tx.Commit(ctx.Context())
}

func (s *docService) UpdateDocService(ctx fiber.Ctx, userId string, req *req.UpdateDocReq) error {
	if err := s.queries.UpdateDoc(ctx.Context(), repository.UpdateDocParams{
		ID:        req.Id,
		Name:      req.Name,
		ParentID:  pgtype.Text{String: req.ParentId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
	}); err != nil {
		log.Errorf("[database] update doc error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}

func (s *docService) DeleteDocService(ctx fiber.Ctx, userId, docId string) error {
	if err := s.queries.DeleteDoc(ctx.Context(), repository.DeleteDocParams{
		ID:        docId,
		IsDeleted: pgtype.Bool{Bool: true, Valid: true},
		UpdatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
	}); err != nil {

		log.Errorf("[database] update doc error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}

func (s *docService) GetDocListService(ctx fiber.Ctx, projectId string) ([]*res.DocItem, error) {
	list, err := s.queries.GetDocListByProjectId(ctx.Context(), pgtype.Text{String: projectId, Valid: true})
	if err != nil {
		log.Errorf("[database] get doc list error: %v", err)
		return nil, errors.New("internal server error")
	}

	dl := sortDocListByPreDocId(list)

	return dl, nil
}

func (s *docService) GetDocListByParentIdService(ctx fiber.Ctx, parentId string) ([]*res.DocItem, error) {
	list, err := s.queries.GetDocListByParentId(ctx.Context(), pgtype.Text{String: parentId, Valid: true})
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
