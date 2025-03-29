"use client";

import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/desktop.module.css";
import { cn } from "@/utils";
import { useEffect } from "react";
import { Window } from "../window";
import { View } from "./View";
import { Wallpaper } from "./wallpaper";

interface DesktopProps {
	className?: string;
}

export const Desktop: React.FC<DesktopProps> = ({ className }) => {
	const { tasks } = useSystem();

	useEffect(() => {
		document.addEventListener("contextmenu", (event) => event.preventDefault());

		return () =>
			document.removeEventListener("contextmenu", (event) =>
				event.preventDefault(),
			);
	}, []);

	return (
		<div id="desktop" className={cn(styles.root, className)}>
			<Wallpaper />
			<View />
			{Object.entries(tasks).map(([id, task]) => {
				return <Window key={id} task={task} />;
			})}
		</div>
	);
};
