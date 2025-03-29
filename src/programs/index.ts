import type { StaticImageData } from "next/image";
// import { Explorer } from "./explorer/explorer"

export const Applications: Record<
	string,
	{
		id: string;
		name: string;
		icons: {
			16: StaticImageData;
			32?: StaticImageData;
			48?: StaticImageData;
		};

		resizable: boolean;
		singleton: boolean;
		toolWindow: boolean;
		maximizeButton: boolean;
		minimizeButton: boolean;
		closeButton: boolean;

		position: {
			x: number;
			y: number;
		};
		size: {
			width: number | string;
			height: number | string;
		};
		minSize: {
			width: number | string;
			height: number | string;
		};
		AppComponent: () => JSX.Element;
	}
> = {
	// Explorer
};
