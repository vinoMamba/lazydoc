package doc

import (
	"fmt"
	"reflect"
	"testing"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazydoc/internal/repository"
)

func TestSortDocListByPreDocId(t *testing.T) {
	list := []repository.Document{
		{ID: "1", Name: "text1", ParentID: pgtype.Text{String: "", Valid: true}, PreDocID: pgtype.Text{String: "", Valid: true}},
		{ID: "2", Name: "text2", ParentID: pgtype.Text{String: "", Valid: true}, PreDocID: pgtype.Text{String: "1", Valid: true}},
		{ID: "3", Name: "text3", ParentID: pgtype.Text{String: "", Valid: true}, PreDocID: pgtype.Text{String: "4", Valid: true}},
		{ID: "4", Name: "text4", ParentID: pgtype.Text{String: "", Valid: true}, PreDocID: pgtype.Text{String: "5", Valid: true}},
		{ID: "5", Name: "text5", ParentID: pgtype.Text{String: "", Valid: true}, PreDocID: pgtype.Text{String: "2", Valid: true}},
	}
	idList := []string{"1", "2", "5", "4", "3"}
	idResult := []string{}

	result := sortDocListByPreDocId(list)
	for _, item := range result {
		idResult = append(idResult, item.Id)
	}
	fmt.Println(idResult)
	if !reflect.DeepEqual(idList, idResult) {
		t.Errorf("id list are not equal")
	}
}
