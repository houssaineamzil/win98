import { cn } from "@/utils";
import React, { type InputHTMLAttributes } from "react";

import styles from "@/styles/components/range.module.css";

interface RangeProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Range = React.forwardRef<HTMLInputElement, RangeProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				ref={ref}
				type="range"
				className={cn(styles.root, className)}
				{...props}
			/>
		);
	},
);
