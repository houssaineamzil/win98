import styles from "@/styles/components/taskbar.module.css";
import type React from "react";
import { Button } from "../button";

export const Start: React.FC = () => {
	return (
		<Button className={styles.start} title="Click here to begin.">
			<img src="/images/start.png" />
			<b>Start</b>
			<div className="absolute" />
		</Button>
	);
};
