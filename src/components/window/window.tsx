import { useWindow } from "@hooks"
import { useSystem } from "@stores/system.store"
import styles from "@styles/components/window.module.scss"
import { cn } from "@utils"
import { useEffect } from "react"
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd"
import { TitleBar } from "./title-bar"

interface Props {
	id: string
	children: React.ReactNode
}

export const Window: React.FC<Props> = ({ children, id }) => {
	const { tasks } = useSystem()
	const window = useWindow(id)

	useEffect(() => {
		console.log("Window: ", window)
	}, [window])

	return (
		// !window.minimized && (
		<Rnd
			style={{
				display: "inline-flex",
				padding: window.maximized ? 0 : undefined,
				boxShadow: window.maximized ? "none" : undefined,
				zIndex: window.focused ? Object.keys(tasks).indexOf(id) + 5 : 9999
			}}
			className={cn(styles.window, { [styles.active]: window.active })}
			onDrag={window.onDrag}
			onResize={window.onResize}
			size={window.size}
			position={window.position}
			onClick={window.focus}
			minWidth={window.minSize.width}
			minHeight={window.minSize.height}
			maxWidth="100%"
			maxHeight="100%"
			dragHandleClassName={styles.titleBar}
			disableDragging={!window.active}
			enableResizing={window.resizable && window.focused}
			bounds="parent">
			<TitleBar {...window} />
			<div className={styles.content}>{children}</div>
		</Rnd>
	)
	// )
}
