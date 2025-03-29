import type { Task } from "@/types";

import { useWindow } from "@/hooks";
import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/taskbar.module.css";
import { cn } from "@/utils";
import Image from "next/image";
import type React from "react";
import { useEffect } from "react";

export const Tasks: React.FC = () => {
	const { tasks } = useSystem();

	return (
		<div className={styles.tasks}>
			{Object.values(tasks).map((task) => {
				return <Task key={window} {...task} />;
			})}
		</div>
	);
};

const Task: React.FC<any> = ({ id }) => {
	const window = useWindow(id);

	useEffect(() => {
		console.log("taskbar: ", window);
	}, [window]);

	return (
		<div
			onClick={
				window.minimized
					? window.unminimize
					: window.focused
						? window.minimize
						: window.focus
			}
			className={cn(styles.task, { [styles.active]: window.active })}
		>
			<Image
				width={16}
				height={16}
				alt={window.title}
				src={window.icons[16]}
				className={styles.icon}
			/>
			<span className={styles.title}>{window.title}</span>
			{/* <span className={styles.tooltip}>{name}</span> */}
		</div>
	);
};
