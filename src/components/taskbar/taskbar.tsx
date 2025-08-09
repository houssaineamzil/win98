import styles from "@/styles/components/taskbar.module.scss";
import { Pinned } from "./pinned";
import { Start } from "./start";
import { Tasks } from "./tasks";
import { Tray } from "./tray";

export const Taskbar: React.FC = () => {
	return (
		<div className={styles.root}>
			<Start />
			<div className={styles.divider} />
			<Pinned />
			<div className={styles.divider} />
			<Tasks />
			<div className={styles.divider} />
			<Tray />
		</div>
	);
};
