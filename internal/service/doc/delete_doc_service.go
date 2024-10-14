package doc

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/gommon/log"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

func (s *docService) DeleteDocService(ctx fiber.Ctx, userId, docId string) error {

	tx, err := s.Queries.NewDB().Begin(ctx.Context())
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx.Context())
	qtx := s.Queries.WithTx(tx)

	d, err := qtx.GetDocById(ctx.Context(), docId)
	if err != nil {
		log.Errorf("[database] get doc error: %v", err)
		return errors.New("internal server error")
	}

	preDoc, err := qtx.GetDocById(ctx.Context(), d.PreDocID.String)
	if err != nil {
		log.Errorf("[database] get pre doc error: %v", err)
		return errors.New("internal server error")
	}

	nextDoc, err := qtx.GetDocByPreDocId(ctx.Context(), pgtype.Text{String: d.ID, Valid: true})

	if err != nil {
		log.Errorf("[database] get next doc error: %v", err)
		return errors.New("internal server error")
	}

	if err := qtx.UpdateDocPreDocId(ctx.Context(), repository.UpdateDocPreDocIdParams{
		PreDocID: pgtype.Text{String: preDoc.ID, Valid: true},
		ID:       nextDoc.ID,
	}); err != nil {
		log.Errorf("[database] update next doc error: %v", err)
		return errors.New("internal server error")
	}

	if err := qtx.DeleteDoc(ctx.Context(), repository.DeleteDocParams{
		ID:        docId,
		IsDeleted: pgtype.Bool{Bool: true, Valid: true},
		UpdatedAt: pgtype.Timestamp{Valid: true, Time: time.Now()},
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
	}); err != nil {

		log.Errorf("[database] update doc error: %v", err)
		return errors.New("internal server error")
	}

	//TODO: delete chidlren

	return tx.Commit(ctx.Context())
}
