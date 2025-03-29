import { useSystem } from "@/stores/system.store";
import Image from "next/image";

import styles from "@/styles/components/desktop.module.css";

export const Wallpaper = () => {
	const { settings } = useSystem();

	return (
		settings.wallpaper && (
			<div className={styles.wallpaper}>
				<Image src={settings.wallpaper} fill alt="wallpaper" />
			</div>
		)
	);
};
