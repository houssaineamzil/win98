import styles from "@/styles/components/range.module.scss";
import { cn } from "@/utils";
import { forwardRef } from "react";

export const Range = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(function Range({ className, ...props }, ref) {
	return (
		<input
			ref={ref}
			type="range"
			className={cn(styles.root, className)}
			{...props}
		/>
	);
});
