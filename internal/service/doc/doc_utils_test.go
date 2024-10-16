package doc

import (
	"fmt"
	"reflect"
	"testing"

	"github.com/vinoMamba/lazydoc/api/res"
)

func TestGenDocList(t *testing.T) {
	list := []*res.DocItem{
		{Id: "1", Name: "node-1", ParentId: "", PreDocId: ""},
		{Id: "3", Name: "node-1-2", ParentId: "1", PreDocId: "2"},
		{Id: "2", Name: "node-1-1", ParentId: "1", PreDocId: ""},
		{Id: "4", Name: "node-2", ParentId: "", PreDocId: "1"},
		{Id: "5", Name: "node-2-1", ParentId: "4", PreDocId: ""},
		{Id: "6", Name: "node-2-2", ParentId: "4", PreDocId: "5"},
	}
	itemMap := genItemMap(list)
	result := buildTree(itemMap)
	result2 := []*res.DocItem{
		{
			Id: "1", Name: "node-1", ParentId: "", PreDocId: "",
			Children: []*res.DocItem{
				{Id: "2", Name: "node-1-1", ParentId: "1", PreDocId: "", Children: []*res.DocItem{}},
				{Id: "3", Name: "node-1-2", ParentId: "1", PreDocId: "2", Children: []*res.DocItem{}},
			},
		},
		{Id: "4", Name: "node-2", ParentId: "", PreDocId: "1", Children: []*res.DocItem{
			{Id: "5", Name: "node-2-1", ParentId: "4", PreDocId: "", Children: []*res.DocItem{}},
			{Id: "6", Name: "node-2-2", ParentId: "4", PreDocId: "5", Children: []*res.DocItem{}},
		}},
	}

	if reflect.DeepEqual(result, result2) {
		t.Log("equal")
	} else {
		fmt.Println(result)
		t.Error("not equal")
	}
}

func TestSortByPreNode(t *testing.T) {
	list := []*res.DocItem{
		{Id: "1", Name: "node-1", ParentId: "", PreDocId: ""},
		{Id: "4", Name: "node-2", ParentId: "", PreDocId: "1"},
		{Id: "5", Name: "node-2", ParentId: "", PreDocId: "6"},
		{Id: "6", Name: "node-2", ParentId: "", PreDocId: "4"},
	}
	result := []*res.DocItem{
		{Id: "1", Name: "node-1", ParentId: "", PreDocId: ""},
		{Id: "4", Name: "node-2", ParentId: "", PreDocId: "1"},
		{Id: "6", Name: "node-2", ParentId: "", PreDocId: "4"},
		{Id: "5", Name: "node-2", ParentId: "", PreDocId: "6"},
	}
	if reflect.DeepEqual(result, sortListByPreNodeId(list)) {
		t.Log("Ok")
	} else {
		t.Error("error")
	}
}
