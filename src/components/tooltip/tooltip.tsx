import styles from "@/styles/components/tooltip.module.css";
import React, { type HTMLAttributes, type ReactElement, useState } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	text?: string;
}

export const Tooltip = React.forwardRef(function Tooltip(
	{ children, className, content }: Props,
	ref,
) {
	const [visible, setVisible] = useState<boolean>(false);
	const [position, setPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: 0,
		y: 0,
	});

	const child = React.cloneElement(children as ReactElement, {
		onMouseEnter: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
			setVisible(true);
			setPosition({
				x: event.clientX,
				y: event.clientY,
			});
		},
		onMouseLeave: () => setVisible(false),
	});

	return (
		<>
			{child}
			<div
				className={styles.root}
				style={{ translate: `${position.y}px ${position.x}px` }}
			>
				<div className={styles.content}>{content}</div>
			</div>
		</>
	);
});
