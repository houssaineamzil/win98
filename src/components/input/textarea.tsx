import { cn } from "@/utils";
import React, { type TextareaHTMLAttributes } from "react";

import styles from "@/styles/components/textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	resize?: "block" | "both" | "horizontal" | "inline" | "none" | "vertical";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	function Textarea(
		{ className, disabled, resize = "both", rows = 5, ...props },
		ref,
	) {
		return (
			<textarea
				ref={ref}
				className={cn(styles.root, className)}
				rows={rows}
				disabled={disabled}
				style={{ resize: disabled ? "none" : resize }}
				{...props}
			/>
		);
	},
);
