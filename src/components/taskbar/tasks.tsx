import type { Task } from "@types"

import { useSystem } from "@stores/system.store"
import styles from "@styles/components/taskbar.module.scss"
import { cn } from "@utils"
import React, { useEffect } from "react"
import { useWindow } from "@hooks"
import Image from "next/image"

export const Tasks: React.FC = () => {
	const { tasks } = useSystem()

	return (
		<div className={styles.tasks}>
			{Object.values(tasks).map((task) => {
				return <Task key={window} {...task} />
			})}
		</div>
	)
}

const Task: React.FC<any> = ({ id }) => {
	const window = useWindow(id)

	useEffect(() => {
		console.log("taskbar: ", window)
	}, [window])

	return (
		<div
			onClick={
				window.minimized
					? window.unminimize
					: window.focused
					? window.minimize
					: window.focus
			}
			className={cn(styles.task, { [styles.active]: window.active })}>
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
	)
}
