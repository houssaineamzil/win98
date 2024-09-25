import type { Window } from "@types"

import { cn } from "@utils"
import React from "react"

import { IconButton } from "@components/button"
import styles from "@styles/components/window.module.scss"
import Image from "next/image"

export const TitleBar: React.FC<Window> = ({ ...window }) => {
	return (
		<div
			className={cn(styles.titleBar, { [styles.inactive]: !window?.active })}>
			<div className={styles.titleWrapper}>
				<Image
					width={16}
					height={16}
					src={window.icons[16]}
					alt=""
					className={styles.icon}
				/>
				<div className={styles.title}>{window?.title}</div>
			</div>
			<div className={styles.controls}>
				{!window?.toolWindow && window?.minimizeButton && (
					<IconButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="6"
								height="2"
								fill="none">
								<path fill="#000" d="M0 0h6v2H0z" />
							</svg>
						}
						onClick={window?.minimize}
						aria-label="Minimize"
					/>
				)}
				{!window?.toolWindow &&
					window?.maximizeButton &&
					(window?.maximized ? (
						<IconButton
							icon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="8"
									height="9"
									fill="none">
									<path
										fill="#000"
										d="M2 0h6v2H2zM7 2h1v4H7zM2 2h1v1H2zM6 5h1v1H6zM0 3h6v2H0zM5 5h1v4H5zM0 5h1v4H0zM1 8h4v1H1z"
									/>
								</svg>
							}
							onClick={window?.maximize}
							aria-label="Maximize"
						/>
					) : (
						<IconButton
							icon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="8"
									height="8"
									fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M9 0H0v9h9V0zM8 2H1v6h7V2z"
										fill="#000"
									/>
								</svg>
							}
							onClick={window?.restore}
							aria-label="Restore"
						/>
					))}
				{/* {window.toolWindow && (
					<IconButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="6"
								height="9"
								fill="none">
								<path
									fill="#000"
									d="M0 1h2v2H0zM1 0h4v1H1zM4 1h2v2H4zM3 3h2v1H3zM2 4h2v2H2zM2 7h2v2H2z"
								/>
							</svg>
						}
						aria-label="Help"
					/>
				)} */}
				{window?.closeButton && (
					<IconButton
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="8"
								height="7"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0V0z"
									fill="#000"
								/>
							</svg>
						}
						onClick={window?.close}
						aria-label="Close"
					/>
				)}
			</div>
		</div>
	)
}
