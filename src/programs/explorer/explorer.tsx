import { cn } from "@/utils";
import { MenuBar } from "./menu-bar";
import { StatusBar } from "./status-bar";

import { Window } from "@/components/window";
import { minSize } from "@/constants/shared";
import windowStyles from "@/styles/components/window.module.css";
import type { Application } from "@/types";

const ExplorerWindow = ({ id }: { id: string }) => {
	// System.ta
	return (
		<Window id={id}>
			<div className={windowStyles.toolbars}>
				<MenuBar />
			</div>
			<div className={cn(windowStyles.content)}>
				<iframe title="Content" width="100%" height="100%" src="" />
			</div>
			<StatusBar
				url="http://www.google.com/"
				icon="internet-explorer"
				application={{
					name: "Internet",
					icon: "internet-explorer",
				}}
			/>
		</Window>
	);
};
export const Explorer: Application = {
	name: "Internet Explorer",
	icons: {
		16: require("@/assets/icons/internet-explorer-16x16.png"),
		32: require("@/assets/icons/internet-explorer-32x32.png"),
		48: require("@/assets/icons/internet-explorer-48x48.png"),
	},

	size: {
		width: 768,
		height: 432,
	},
	minSize,
	position: {
		x: 500,
		y: 150,
	},
	resizable: true,
	singleton: false,
	toolWindow: false,
	maximizeButton: true,
	minimizeButton: true,
	closeButton: true,

	AppComponent: ExplorerWindow,
};
