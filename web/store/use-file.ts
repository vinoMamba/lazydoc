import { create } from 'zustand'

type State = {
  currentFileId: string
  currentEditFileId: string
}

type Action = {
  updateCurrentFileId: (id: State['currentFileId']) => void
  updateCurrentEditFileId: (id: State['currentEditFileId']) => void
}

export const useFileStore = create<State & Action>((set) => ({
  currentFileId: '',
  currentEditFileId: '',
  updateCurrentFileId: (id: State['currentFileId']) => {
    set(() => ({ currentFileId: id }))
  },

  updateCurrentEditFileId: (id: State['currentEditFileId']) => {
    set(() => ({ currentEditFileId: id }))
  },
}))
