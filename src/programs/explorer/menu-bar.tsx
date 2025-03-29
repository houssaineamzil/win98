import { cn } from "@/utils";
import type React from "react";
import { useState } from "react";

import styles from "@/styles/components/window.module.css";

type ToolBarProps = {};

const menuItems = [
	{
		name: "File",
		items: [
			{ name: "Exit" },
			{ name: "Exit" },
			{ name: "Exit" },
			{ name: "Exit" },
		],
	},
];

export const MenuBar: React.FC<ToolBarProps> = () => {
	return (
		<div className={cn(styles.toolbar)}>
			<div className={styles.dragHandle} />
			<div className={cn(styles.menu)} role="menubar">
				{menuItems.map((item) => {
					const hotkey = item.name.charAt(0);
					const [highlight, setHighlight] = useState(false);
					const [active, setActive] = useState(false);

					return (
						<div
							key={item.name}
							id={item.name}
							className={cn(styles.button, {
								[styles.highlight]: highlight,
								[styles.active]: active,
							})}
							aria-expanded="false"
							aria-haspopup="true"
							role="menuitem"
							aria-controls=""
							tabIndex={-1}
							onMouseEnter={() => setHighlight(true)}
							onMouseLeave={() => setHighlight(false)}
							onClick={() => setActive(true)}
						>
							<span>
								<span className={styles.hotkey}>{hotkey}</span>
								{item.name.slice(1)}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
