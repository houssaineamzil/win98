// Imports
import cn from "classnames"

// Styles
import styles from "_styles/components/taskbar/tasks.module.scss"

// Types

// Logic
export const Tasks = () => {
	const tasks = [
		{ name: "Internet Explore", active: true },
		{ name: "My Documents", active: false },
	]

	return (
		<div className={styles.tasks}>
			{tasks.map((task) => {
				return (
					<button
						key={task.name}
						className={cn(styles.task, task.active && styles.active)}>
						{task.name}
					</button>
				)
			})}
		</div>
	)
}
