import { cn } from "@/utils";
import type React from "react";

import styles from "@/styles/components/window.module.css";
import Image from "next/image";
import { Icon } from "@/components/icon";

interface StatusBarProps {
	url: string;
	icon: string;
	application: {
		icon: string;
		name: string;
	};
}

export const StatusBar: React.FC<StatusBarProps> = ({
	url,
	icon,
	application,
}) => {
	return (
		<div className={cn(styles.statusBar)}>
			<div className={styles.field} style={{ width: 250 }}>
				<Icon name={icon} size={16} />
				<span id="status-bar-left-text">{url}</span>
			</div>
			<div className={styles.field} style={{ flex: 1 }} />
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
	);
};
