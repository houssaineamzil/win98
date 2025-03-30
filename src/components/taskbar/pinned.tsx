import { taskbar } from "@/stores/taskbar.store";
import styles from "@/styles/components/taskbar.module.css";
import { Icon } from "../icon";

export const Pinned: React.FC = () => {
	const { pinned } = taskbar();

	return (
		<div className={styles.pinned}>
			{pinned.map((app) => {
				return (
					<div key={app.id}>
						<Icon name={app.icon} size={16} />
					</div>
				);
			})}
		</div>
	);
};
