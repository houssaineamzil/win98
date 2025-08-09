interface Props {
	title?: string;
	icon?: string;

	position?: {
		x: number;
		y: number;
	};
	size?: {
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

	active?: boolean;
	resizable?: boolean;
	maximized?: boolean;
	minimized?: boolean;
	isFullscreen?: boolean;
	alwaysOnTop?: boolean;
}

export class Window {
	constructor({
		title = "Window",
		icon = "",
		position = {
			x: 0,
			y: 0,
		},
		size = {
			width: 800,
			height: 600,
		},
		minSize,
		maxSize,

		toolWindow = false,
		minimizeButton = true,
		maximizeButton = true,
		closeButton = true,

		active = false,
		resizable = false,
		maximized = false,
		minimized = false,
		isFullscreen = false,
		alwaysOnTop = false,
	}: Props) {
		this.title = title;
		this.icon = icon;

		this.position = position;

		this.size = size;
		this.minSize = minSize;
		this.maxSize = maxSize;

		this.toolWindow = toolWindow;
		this.minimizeButton = minimizeButton;
		this.maximizeButton = maximizeButton;
		this.closeButton = closeButton;

		this.active = active;
		this.resizable = resizable;
		this.maximized = maximized;
		this.minimized = minimized;
		this.isFullscreen = isFullscreen;
		this.alwaysOnTop = alwaysOnTop;
	}

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
	maximizeButton?: boolean;
	minimizeButton?: boolean;
	closeButton?: boolean;

	active: boolean;
	resizable: boolean;
	maximized: boolean;
	minimized: boolean;
	isFullscreen: boolean;
	alwaysOnTop: boolean;
}
