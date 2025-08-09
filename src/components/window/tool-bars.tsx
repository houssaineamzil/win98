import { cn } from "@/utils";

import styles from "@/styles/components/window.module.scss";
interface Props {
	toolbar?: {
		menu: {
			label: string;
			hotkey: string;
		}[];
	};
}

export const ToolBars: React.FC<Props> = ({
	toolbar = {
		menu: [
			{ label: "File", hotkey: "F" },
			{ label: "Edit", hotkey: "E" },
			{ label: "View", hotkey: "V" },
			{ label: "Go", hotkey: "G" },
			{ label: "Favorites", hotkey: "a" },
			{ label: "Tools", hotkey: "T" },
			{ label: "Help", hotkey: "H" },
		],
	},
}) => {
	return (
		<div className={cn(styles.toolBars)}>
			<div className={styles.toolbar}>
				<div className={styles.dragHandle} />
				<div
					className={styles.menus}
					role="menubar"
					aria-label="Application Menu"
				>
					{toolbar?.menu.map((item, index) => {
						const labelParts = item.label.split(
							new RegExp(`(${item.hotkey})`, "i"),
						);
						return (
							<div
								key={item.label}
								className={cn(
									styles.button,
									`${item.label.toLowerCase()}-menu-button`,
								)}
								aria-expanded="false"
								aria-haspopup="true"
								role="menuitem"
								id={`menu-button-${item.label}-${index}`}
								aria-controls={`menu-popup-${index}`}
								tabIndex={-1}
							>
								<span>
									{labelParts.map((part) =>
										part.toLowerCase() === item.hotkey.toLowerCase() ? (
											<span key={part} className={styles.hotkey}>
												{part}
											</span>
										) : (
											part
										),
									)}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
