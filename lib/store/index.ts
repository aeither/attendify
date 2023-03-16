import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  privateKey: string | undefined
  setPrivateKey: (privateKey: string | undefined) => void
  isDarkMode: boolean
  setIsDarkMode: (isDarkMode: boolean) => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      privateKey: undefined,
      setPrivateKey: (privateKey) => set(() => ({ privateKey: privateKey })),
      isDarkMode: true,
      setIsDarkMode: (isDarkMode: boolean) => set(() => ({ isDarkMode })),
    }),
    {
      name: 'attendify-storage', // unique name
    },
  ),
)
