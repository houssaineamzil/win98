import { cn } from "@utils"
import React from "react"

import styles from "@styles/components/window.module.scss"
import Image, { StaticImageData } from "next/image"

interface StatusBarProps {
	url: string
	icon: StaticImageData
	application: {
		icon: StaticImageData
		name: string
	}
}

export const StatusBar: React.FC<StatusBarProps> = ({
	url,
	icon,
	application
}) => {
	return (
		<div className={cn(styles.statusBar)}>
			<div className={styles.field} style={{ width: 250 }}>
				<Image width={16} height={16} src={icon} alt={url} />
				<span id="status-bar-left-text">{url}</span>
			</div>
			<div className={styles.field} style={{ flex: 1 }}></div>
			<div className={styles.field} style={{ width: 170 }}>
				<Image
					width={16}
					height={16}
					src={application.icon}
					alt={application.name}
				/>
				<span id="status-bar-left-text">{application.name}</span>
			</div>
		</div>
	)
}
