import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  privateKey: string | undefined
  setPrivateKey: (privateKey: string | undefined) => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      privateKey: undefined,
      setPrivateKey: (privateKey) => set(() => ({ privateKey: privateKey })),
    }),
    {
      name: 'attendify-storage', // unique name
    },
  ),
)
