import { cn } from "@/utils";
import React, { type ButtonHTMLAttributes } from "react";

import styles from "@/styles/components/button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
	disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{ className, active = false, disabled = false, children, ...props },
		ref,
	) {
		return (
			<button
				ref={ref}
				className={cn(styles.root, className, { [styles.active]: active })}
				disabled={disabled}
				{...props}
			>
				{children}
			</button>
		);
	},
);
