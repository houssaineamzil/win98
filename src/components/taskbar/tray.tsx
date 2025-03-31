import { useSystem } from "@/stores/system.store";
import { taskbar } from "@/stores/taskbar.store";
import styles from "@/styles/components/taskbar.module.scss";
import { Icon } from "../icon";

export const Tray: React.FC = () => {
	const { icons, time } = taskbar();
	const { settings } = useSystem();

	return (
		<div className={styles.tray}>
			<div className={styles.icons}>
				{icons.map((icon) => (
					<Icon
						key={icon.title}
						name={icon.icon}
						size={16}
						title={icon.title}
						className={styles.icon}
					/>
				))}
			</div>
			<div
				className={styles.time}
				title={time.time.toLocaleString(settings.locale, {
					weekday: "long",
					month: "long",
					day: "2-digit",
					minute: "2-digit",
					hour: "2-digit",
					hour12: settings.hour12,
					timeZone: settings.timezone,
				})}
			>
				{time.time.toLocaleTimeString(settings.locale, {
					hour: "2-digit",
					minute: "2-digit",
					hour12: settings.hour12,
					timeZone: settings.timezone,
				})}
			</div>
		</div>
	);
};
