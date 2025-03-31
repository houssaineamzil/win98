import type { TaskType } from "@/types";

import { create } from "zustand";

export enum ApplicationsEnum {
	EXPLORER = "Explorer",
	NOTEPAD = "Notepad",
}

export const useSystem = create<{
	activeTask: string | null;
	tasks: {
		[key: string]: TaskType;
	};

	desktop: ApplicationsEnum[];

	settings: {
		wallpaper: string | null;
		hour12: boolean;
		locale: string;
		timezone: string;
	};
}>(() => ({
	activeTask: null,
	tasks: {},

	desktop: [ApplicationsEnum.EXPLORER, ApplicationsEnum.NOTEPAD],

	settings: {
		wallpaper: null,
		hour12: true,
		locale: "en-US",
		timezone: "Africa/Casablanca",
	},
}));
