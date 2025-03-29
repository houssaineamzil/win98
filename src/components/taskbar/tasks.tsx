import { useWindow } from "@/hooks";
import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/taskbar.module.css";
import type { TaskType } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";
import type React from "react";

export const Tasks: React.FC = () => {
	const { tasks } = useSystem();

	return (
		<div className={styles.tasks}>
			{Object.values(tasks).map((task) => {
				return <Task key={task.id} task={task} />;
			})}
		</div>
	);
};

const Task: React.FC<{ task: TaskType }> = ({ task }) => {
	const window = useWindow(task);
	const { activeTask } = useSystem();

	return (
		<div
			onClick={
				window.minimized
					? window.unminimize
					: activeTask === task.id
						? window.minimize
						: window.focus
			}
			className={cn(styles.task, { [styles.active]: activeTask === task.id })}
		>
			<Image
				width={16}
				height={16}
				alt={window.title}
				src={window.icon}
				className={styles.icon}
			/>
			<span className={styles.title}>{window.title}</span>
			{/* <span className={styles.tooltip}>{name}</span> */}
		</div>
	);
};
