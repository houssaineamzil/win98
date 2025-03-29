import type { Window } from "@/utils/window";
import type { RndDragCallback, RndResizeCallback } from "react-rnd";

export interface ApplicationType {
	name: string;
	description: string;
	version: string;
	resizable: boolean;
	icon: string;

	minSize: {
		width: number;
		height: number;
	};
	size: {
		width: number;
		height: number;
	};
	position: {
		x: number;
		y: number;
	};

	content: React.ReactNode;

	onResize?: RndResizeCallback;
	onDrag?: RndDragCallback;
}

export interface WindowType {
	title: string;
	icon: string;

	position: {
		x: number;
		y: number;
	};

	size: {
		width: number;
		height: number;
	};
	minSize?: {
		width: number;
		height: number;
	};
	maxSize?: {
		width: number;
		height: number;
	};

	toolWindow?: boolean;
	minimizeButton?: boolean;
	maximizeButton?: boolean;
	closeButton?: boolean;

	active: boolean;
	resizable: boolean;
	maximized: boolean;
	minimized: boolean;
	isFullscreen: boolean;
	alwaysOnTop: boolean;
}

export interface TaskType {
	id: string;
	window: Window;
	application: ApplicationType;
}
