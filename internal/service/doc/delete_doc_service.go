package doc

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/gommon/log"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

func (s *docService) DeleteDocService(ctx fiber.Ctx, userId, docId, preDocId, nextSiblingId string) error {
	tx, err := s.Queries.NewDB().Begin(ctx.Context())
	if err != nil {
		return err
	}

	defer tx.Rollback(ctx.Context())
	qtx := s.Queries.WithTx(tx)

	if err := qtx.UpdateDocPreDocId(ctx.Context(), repository.UpdateDocPreDocIdParams{
		PreDocID: pgtype.Text{String: preDocId, Valid: true},
		ID:       nextSiblingId,
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
