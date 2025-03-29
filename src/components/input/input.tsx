import { cn } from "@/utils";
import React, { type InputHTMLAttributes } from "react";

import styles from "@/styles/components/input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	icon?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	function Input({ className, disabled, icon, ...props }, ref) {
		return (
			<div
				className={cn(styles.root, className, { [styles.disabled]: disabled })}
			>
				{icon && (
					<img
						alt="input icon"
						className={styles.icon}
						src={`/images/${icon}.png`}
					/>
				)}
				<input ref={ref} {...props} />
			</div>
		);
	},
);
