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

func (s *docService) UpdateDocService(ctx fiber.Ctx, userId string, req *req.UpdateDocReq) error {
	if err := s.Queries.UpdateDoc(ctx.Context(), repository.UpdateDocParams{
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
