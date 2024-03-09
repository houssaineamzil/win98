"use client"

// Imports
import WindowsLogo from "_assets/icons/windows.png"
import Image from "next/image"

// Styles
import styles from "_styles/components/taskbar/start.module.scss"
import { StartMenu } from "_constants/taskbar/start"
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { startMenuItem } from "_types/types"
import classNames from "classnames"

// Types

// Logic
export const Start = () => {
	const renderMenu = (items: startMenuItem[], isSub: boolean) => (
		<>
			{items.map((item) =>
				item?.submenu ? (
					<DropdownMenuSub key={item.label}>
						<DropdownMenuSubTrigger
							className={classNames(isSub ? styles.subItem : styles.item)}>
							<div className={styles.container}>
								<Image
									src={item.icon!}
									className={styles.icon}
									alt={`${item.label} icon`}
								/>
								{item.label}
							</div>
							<svg
								width="10"
								height="12"
								viewBox="0 0 10 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M2.5 1.625L2.5 10.375L3.75 10.375L3.75 9.125L5 9.125L5 7.875L6.25 7.875L6.25 6.625L7.5 6.625L7.5 5.375L6.25 5.375L6.25 4.125L5 4.125L5 2.875L3.75 2.875L3.75 1.625L2.5 1.625Z"
									fill="currentColor"
								/>
							</svg>
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent sideOffset={-5} className={styles.menu}>
							{item.submenu && renderMenu(item.submenu!, true)}
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				) : item.label === "separator" ? (
					<div key={item.label} className={styles.separator} />
				) : (
					<DropdownMenuItem
						key={item.label}
						className={classNames(isSub ? styles.subItem : styles.item)}>
						<div className={styles.container}>
							<Image
								src={item.icon!}
								className={styles.icon}
								alt={`${item.label} icon`}
							/>
							{item.label}
						</div>
					</DropdownMenuItem>
				)
			)}
		</>
	)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className={styles.start}>
					<Image
						src={WindowsLogo}
						className={styles.icon}
						alt="windows 98 start logo"
					/>
					<span className={styles.label}>Start</span>
				</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuContent
						className={styles.menu}
						align="start"
						sideOffset={6}>
						{renderMenu(StartMenu, false)}
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenu>
		</>
	)
}
