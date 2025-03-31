import { useWindow } from "@/hooks";
import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/window.module.scss";
import type { TaskType } from "@/types";
import { cn } from "@/utils";
import { Rnd } from "react-rnd";
import { TitleBar } from "./title-bar";

export const Window: React.FC<{ task: TaskType }> = ({ task }) => {
	const window = useWindow(task);
	const { activeTask, tasks } = useSystem();

	return (
		!window.minimized && (
			<Rnd
				style={{
					display: "inline-flex",
					padding: window.maximized ? 0 : undefined,
					boxShadow: window.maximized ? "none" : undefined,
					zIndex:
						activeTask === task.id
							? 9999
							: Object.keys(tasks).indexOf(task.id) + 5,
				}}
				className={cn(styles.window, {
					[styles.active]: activeTask === task.id,
				})}
				onDrag={window.onDrag}
				onResize={window.onResize}
				size={window.size}
				position={window.position}
				onClick={window.focus}
				minWidth={window.minSize?.width}
				minHeight={window.minSize?.height}
				maxWidth="100%"
				maxHeight="100%"
				dragHandleClassName={styles.titleBar}
				disableDragging={activeTask !== task.id}
				enableResizing={window.resizable && activeTask === task.id}
				bounds="parent"
			>
				<TitleBar {...window} />
				<div className={styles.content}>{task.application.content}</div>
			</Rnd>
		)
	);
};
