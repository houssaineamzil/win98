import { cn } from "@/utils";

import styles from "@/styles/components/button.module.scss";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
	disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
