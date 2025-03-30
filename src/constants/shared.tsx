import { ApplicationsEnum } from "@/stores/system.store";

export const minSize = {
	width: 768,
	height: 432,
};

export const Applications = {
	[ApplicationsEnum.EXPLORER]: {
		name: "File Explorer",
		icon: "computer_2_cool-1",
		description: "",
		version: "1.0.0",
		resizable: true,
		minSize: {
			width: 768,
			height: 340,
		},
		size: {
			width: 768,
			height: 340,
		},
		position: {
			x: 150,
			y: 150,
		},
		content: <div />,
	},
	[ApplicationsEnum.NOTEPAD]: {
		name: "Notepad",
		icon: "notepad-0",
		description: "",
		version: "1.0.0",
		resizable: true,
		minSize: {
			width: 768,
			height: 340,
		},
		size: {
			width: 768,
			height: 340,
		},
		position: {
			x: 150,
			y: 150,
		},
		content: <div />,
	},
};
