package doc

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/gommon/log"
	"github.com/vinoMamba/lazydoc/api/req"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

// NOTE:  新增文件会添加到当前parentID 的children 的第一个。因此会更新旧的第一个节点的pre_doc_id 为当前新节点的id

func (s *docService) CreateDocService(ctx fiber.Ctx, userId string, req *req.CreateDocReq) (string, error) {

	tx, err := s.Queries.NewDB().Begin(ctx.Context())
	if err != nil {
		return "", err
	}

	defer tx.Rollback(ctx.Context())
	qtx := s.Queries.WithTx(tx)

	docId, err := s.Sid.GenString()

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
