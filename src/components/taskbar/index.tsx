// Imports
import { Pinned } from "./pinned"
import { Start } from "./start"
import { Tasks } from "./tasks"
import { Tray } from "./tray"

// Styles
import styles from "_styles/components/taskbar/taskbar.module.scss"

// Types

// Logic
export const TaskBar = () => {
	return (
		<div className={styles.taskbar}>
			<Start />
			<div className={styles.separator} />
			<Pinned />
			<div className={styles.separator} />
			<Tasks />
			<div className={styles.separator} />
			<Tray />
		</div>
	)
}
