import styles from "@/styles/components/taskbar.module.css";
import { Button } from "../button";
import { Icon } from "../icon";

export const Start: React.FC = () => {
	return (
		<Button className={styles.start} title="Click here to begin.">
			<Icon name="windows-3" size={16} />
			<b>Start</b>
			<div className="absolute" />
		</Button>
	);
};
