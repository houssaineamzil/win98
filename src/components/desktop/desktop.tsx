"use client"

import { useSystem } from "@stores/system.store"
import styles from "@styles/components/desktop.module.scss"
import { cn } from "@utils"
import { useEffect } from "react"
import { ExplorerView } from "./explorerView"
import { Wallpaper } from "./wallpaper"

interface DesktopProps {
	className?: string
}

export const Desktop: React.FC<DesktopProps> = ({ className }) => {
	const { tasks } = useSystem()

	useEffect(() => {
		document.addEventListener("contextmenu", (event) => event.preventDefault())

		return () =>
			document.removeEventListener("contextmenu", (event) =>
				event.preventDefault()
			)
	}, [])

	return (
		<div id="desktop" className={cn(styles.root, className)}>
			<Wallpaper />
			<ExplorerView />
			{Object.values(tasks).map((task) => {
				const { AppComponent } = task.application

				return <AppComponent key={task.id} id={task.id} />
			})}
		</div>
	)
}
