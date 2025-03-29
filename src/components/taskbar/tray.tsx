import { taskbar } from "@/stores/taskbar.store";
import styles from "@/styles/components/taskbar.module.css";
import type React from "react";
import { useSnapshot } from "valtio";

export const Tray: React.FC = () => {
	const { icons, time } = useSnapshot(taskbar);

	return (
		<div className={styles.tray}>
			<div className={styles.icons}>
				{icons.map((icon) => (
					<img
						key={icon.title}
						className={styles.icon}
						src={icon.icon}
						title={icon.title}
					/>
				))}
			</div>
			<div
				className={styles.time}
				title={time.time.toLocaleString(time.locale, {
					weekday: "long",
					month: "long",
					day: "2-digit",
					minute: "2-digit",
					hour: "2-digit",
					hour12: time.hour12,
					timeZone: time.timezone,
				})}
			>
				{time.time.toLocaleTimeString(time.locale, {
					hour: "2-digit",
					minute: "2-digit",
					hour12: time.hour12,
					timeZone: time.timezone,
				})}
			</div>
		</div>
	);
};
