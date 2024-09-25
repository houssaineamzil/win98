import { cn } from "@utils"
import React, { InputHTMLAttributes } from "react"

import styles from "@styles/components/input.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	icon?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	function Input({ className, disabled, icon, ...props }, ref) {
		return (
			<div
				className={cn(styles.root, className, { [styles.disabled]: disabled })}>
				{icon && <img className={styles.icon} src={`/images/${icon}.png`} />}
				<input ref={ref} {...props} />
			</div>
		)
	}
)
