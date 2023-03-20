import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  decryptKey: string | undefined
  setDecryptKey: (decryptKey: string | undefined) => void
  publicKey: string | undefined
  setPublicKey: (publicKey: string | undefined) => void
  isDarkMode: boolean
  setIsDarkMode: (isDarkMode: boolean) => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      decryptKey: undefined,
      setDecryptKey: (decryptKey) => set(() => ({ decryptKey: decryptKey })),
      publicKey: undefined,
      setPublicKey: (publicKey) => set(() => ({ publicKey: publicKey })),
      isDarkMode: true,
      setIsDarkMode: (isDarkMode: boolean) => set(() => ({ isDarkMode })),
    }),
    {
      name: 'attendify-storage', // unique name
    },
  ),
)
