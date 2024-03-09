import { create } from 'zustand'

import { SystemScreen, SystemStore } from '_types/store'

export const useSystem = create<SystemStore>()((set) => ({
  screen: SystemScreen.BOOT,
  setScreen: (screen: SystemScreen) => set(() => ({ screen })),
}))
