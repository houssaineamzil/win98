import { cn } from "@utils"
import React, { ButtonHTMLAttributes } from "react"

import styles from "@styles/components/button.module.scss"
import { Button } from "./button"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: React.ReactNode
}

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function IconButton({ icon, className, ...props }, ref) {
		return (
			<Button className={cn(styles.icon, className)} ref={ref} {...props}>
				{icon}
			</Button>
		)
	}
)
