package doc

import (
	"github.com/vinoMamba/lazydoc/api/res"
)

func genItemMap(list []*res.DocItem) map[string][]*res.DocItem {
	treeMap := make(map[string][]*res.DocItem)
	for _, item := range list {
		if item.ParentId == "" {
			treeMap["root"] = append(treeMap["root"], item)
		} else {
			treeMap[item.ParentId] = append(treeMap[item.ParentId], item)
		}
	}
	return treeMap
}

func buildTree(itemMap map[string][]*res.DocItem) []*res.DocItem {
	var result []*res.DocItem
	roots := itemMap["root"]
	for _, root := range roots {
		assembleChildren(root, itemMap)
		result = append(result, root)
	}
	sortListByPreNodeId(result)
	return result
}

func assembleChildren(parent *res.DocItem, treeMap map[string][]*res.DocItem) {
	children := treeMap[parent.Id]
	parent.Children = sortListByPreNodeId(children)
	for _, child := range children {
		assembleChildren(child, treeMap)
	}
}

func sortListByPreNodeId(list []*res.DocItem) []*res.DocItem {
	sortedArray := make([]*res.DocItem, 0)
	idMap := make(map[string]*res.DocItem)

	for _, item := range list {
		if item.PreDocId != "" {
			idMap[item.PreDocId] = item
		}
	}

	for _, item := range list {
		if item.PreDocId == "" {
			current := item
			sortedArray = append(sortedArray, current)

			nextId := current.Id

			for idMap[nextId] != nil {
				current = idMap[nextId]
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
