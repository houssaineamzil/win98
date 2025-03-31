import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/desktop.module.scss";
import Image from "next/image";

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
