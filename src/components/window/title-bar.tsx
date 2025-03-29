import { cn } from "@/utils";
import type React from "react";

import { IconButton } from "@/components/button";
import styles from "@/styles/components/window.module.css";
import Image from "next/image";

interface Props {
	title: string;
	icon: string;

	toolWindow?: boolean;
	minimizeButton?: boolean;
	maximizeButton?: boolean;
	closeButton?: boolean;

	maximized: boolean;

	close: () => void;
	minimize: () => void;
	maximize: () => void;
	restore: () => void;
}

export const TitleBar: React.FC<Props> = ({
	title,
	icon,
	maximized,
	toolWindow,
	minimizeButton,
	maximizeButton,
	closeButton,
	close,
	minimize,
	maximize,
	restore,
}) => {
	return (
		<div className={cn(styles.titleBar)}>
			<div className={styles.titleWrapper}>
				<Image
					width={16}
					height={16}
					src={icon}
					alt={`${title} icon`}
					className={styles.icon}
				/>
				<div className={styles.title}>{title}</div>
			</div>
			<div className={styles.controls}>
				{!toolWindow && minimizeButton && (
					<IconButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="6"
								height="2"
								fill="none"
							>
								<title>Minimize Button</title>
								<path fill="#000" d="M0 0h6v2H0z" />
							</svg>
						}
						onClick={minimize}
						aria-label="Minimize"
					/>
				)}
				{!toolWindow &&
					maximizeButton &&
					(maximized ? (
						<IconButton
							icon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="8"
									height="9"
									fill="none"
								>
									<title>Minimize Button</title>
									<path
										fill="#000"
										d="M2 0h6v2H2zM7 2h1v4H7zM2 2h1v1H2zM6 5h1v1H6zM0 3h6v2H0zM5 5h1v4H5zM0 5h1v4H0zM1 8h4v1H1z"
									/>
								</svg>
							}
							onClick={maximize}
							aria-label="Maximize"
						/>
					) : (
						<IconButton
							icon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="8"
									height="8"
									fill="none"
								>
									<title>Restore Button</title>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M9 0H0v9h9V0zM8 2H1v6h7V2z"
										fill="#000"
									/>
								</svg>
							}
							onClick={restore}
							aria-label="Restore"
						/>
					))}
				{/* {toolWindow && (
					<IconButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="6"
								height="9"
								fill="none">
								<title>Tool Button</title>
								<path
									fill="#000"
									d="M0 1h2v2H0zM1 0h4v1H1zM4 1h2v2H4zM3 3h2v1H3zM2 4h2v2H2zM2 7h2v2H2z"
								/>
							</svg>
						}
						aria-label="Help"
					/>
				)} */}
				{closeButton && (
					<IconButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="8"
								height="7"
								fill="none"
							>
								<title>Close Button</title>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0V0z"
									fill="#000"
								/>
							</svg>
						}
						onClick={close}
						aria-label="Close"
					/>
				)}
			</div>
		</div>
	);
};
