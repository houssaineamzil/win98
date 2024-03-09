import React from "react"
import styles from "_styles/components/apps/desktop.module.scss"
import GridLayout from "react-grid-layout"

import InterntExplorer from "_assets/icons/navigator.png"
import Image from "next/image"

const apps = [
	{
		label: "My Computer",
		icon: InterntExplorer,
		shortcut: false,
	},
	{
		label: "My Documments",
		icon: InterntExplorer,
		shortcut: false,
	},
	{
		label: "Internet Explore",
		icon: InterntExplorer,
		shortcut: true,
	},
	...new Array(195).fill(undefined),
]

export const Desktop = () => {
	const children = React.useMemo(() => {
		return apps.map((app, idx) => {
			const height = Math.floor((window.innerHeight - 40) / 78)

			return (
				<div
					key={idx}
					className={styles.desktopIcon}
					data-grid={{
						x: Math.floor(idx / height),
						y: idx % height,
						w: 1,
						h: 1,
						isResizable: false,
					}}>
					{app ? (
						<>
							<div className={styles.iconWrapper}>
								<Image
									src={app?.icon}
									className={styles.icon}
									alt={`${app?.label} icon`}
								/>
								<div className={styles.selectionEffect}></div>
							</div>
							<div className={styles.label}>{app?.label}</div>
						</>
					) : (
						<></>
					)}
				</div>
			)
		})
	}, [])

	return (
		<div className={styles.desktop}>
			<GridLayout
				cols={18}
				rowHeight={78}
				isBounded
				isDraggable
				width={window.innerWidth}
				margin={[1.5, 1.5]}>
				{children}
			</GridLayout>
		</div>
	)
}
