import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  itemId: string | undefined
  setItemId: (targetAddress: string | undefined) => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      itemId: undefined,
      setItemId: (itemId) => set(() => ({ itemId: itemId })),
    }),
    {
      name: 'hackathon-storage', // unique name
    },
  ),
)
