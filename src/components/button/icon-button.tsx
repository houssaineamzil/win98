import { cn } from "@/utils";
import { forwardRef } from "react";

import styles from "@/styles/components/button.module.scss";
import { Button } from "./button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
	function IconButton({ icon, className, ...props }, ref) {
		return (
			<Button className={cn(styles.icon, className)} ref={ref} {...props}>
				{icon}
			</Button>
		);
	},
);
