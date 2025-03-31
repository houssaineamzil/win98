import styles from "@/styles/components/input.module.scss";
import { cn } from "@/utils";
import React, { type InputHTMLAttributes } from "react";
import { Icon } from "../icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	icon?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	function Input({ className, disabled, icon, ...props }, ref) {
		return (
			<div
				className={cn(styles.root, className, { [styles.disabled]: disabled })}
			>
				{icon && <Icon name={icon} size={16} className={styles.icon} />}
				<input ref={ref} {...props} />
			</div>
		);
	},
);
