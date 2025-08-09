import { useWindow } from "@/hooks";
import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/window.module.scss";
import type { TaskType } from "@/types";
import { cn } from "@/utils";
import { Rnd } from "react-rnd";
import { Icon } from "../icon";
import { StatusBar } from "./status-bar";
import { TitleBar } from "./title-bar";
import { ToolBars } from "./tool-bars";

export const Window: React.FC<{ task: TaskType }> = ({ task }) => {
	const window = useWindow(task);
	const { tasks } = useSystem();

	return (
		!window.minimized && (
			<Rnd
				style={{
					display: "inline-flex",
					padding: window.maximized ? 0 : undefined,
					boxShadow: window.maximized ? "none" : undefined,
					zIndex: window.active
						? 9999
						: Object.keys(tasks).indexOf(task.id) + 5,
				}}
				className={cn(styles.window, {
					[styles.active]: window.active,
				})}
				onDrag={window.onDrag}
				onResize={window.onResize}
				size={window.size}
				position={window.position}
				// onClick={window.focus}
				minWidth={window.minSize?.width}
				minHeight={window.minSize?.height}
				maxWidth="100%"
				maxHeight="100%"
				dragHandleClassName={styles.titleBar}
				disableDragging={!window.active}
				enableResizing={window.resizable && window.active}
				bounds="parent"
			>
				<TitleBar {...window} />
				<ToolBars />
				<div className={styles.content}>{task.application.content}</div>
				<StatusBar
					right={
						<>
							<Icon size={16} name={window.icon} />
							{window.title}
						</>
					}
				/>
			</Rnd>
		)
	);
};
