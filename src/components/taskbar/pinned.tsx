import { taskbar } from "@/stores/taskbar.store";
import styles from "@/styles/components/taskbar.module.css";
import Image from "next/image";
import type React from "react";

export const Pinned: React.FC = () => {
	const { pinned } = taskbar();

	return (
		<div className={styles.pinned}>
			{pinned.map((app) => {
				return (
					<div key={app.id}>
						<Image width={16} height={16} src={app.icon} alt={app.name} />
					</div>
				);
			})}
		</div>
	);
};
