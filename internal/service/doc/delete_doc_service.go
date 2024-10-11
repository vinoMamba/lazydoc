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
	if err := s.Queries.DeleteDoc(ctx.Context(), repository.DeleteDocParams{
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
