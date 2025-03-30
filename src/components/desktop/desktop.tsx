"use client";

import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/desktop.module.css";
import type { TaskType } from "@/types";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { Window } from "../window";
import { View } from "./View";
import { Wallpaper } from "./wallpaper";

interface DesktopProps {
	className?: string;
}

export const Desktop: React.FC<DesktopProps> = ({ className }) => {
	const { tasks } = useStore(useSystem);
	const [windows, setWindows] = useState<TaskType[]>([]);

	useEffect(() => {
		setWindows(Object.values(tasks));
	}, [tasks]);

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
			{windows.map((task) => {
				return <Window key={task.id} task={task} />;
			})}
		</div>
	);
};
