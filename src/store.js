import { create } from "zustand"

export const tabsStore = create()((set) => ({
	current: [
		{
			name: "Regsvr32",
		},
		{
			name: "Internet Explorer",
			inactive: true,
		},
	],
	openTab: (tab) => set((state) => ({ current: [...state.current, tab] })),
}))
