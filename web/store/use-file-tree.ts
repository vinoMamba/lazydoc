import { DocItemType } from "@/schemas/doc"
import { TreeApi } from "react-arborist"
import { create } from "zustand"

type State = {
  treeApi: TreeApi<DocItemType> | null
}

type Action = {
  setTreeApi: (treeApi: State['treeApi']) => void
}

export const useFileTreeStore = create<State & Action>((set) => ({
  treeApi: null,
  setTreeApi: (treeApi) => set(() => ({ treeApi }))
}))
