import styles from "@styles/components/checkbox.module.scss"
import { cn } from "@utils"
import React, { InputHTMLAttributes, useEffect, useRef } from "react"

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	invalid?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	function Checkbox(
		{
			value,
			invalid = false,
			checked,
			defaultChecked,
			disabled,
			onChange,
			required,
			...props
		},
		ref
	) {
		ref = ref || useRef<HTMLInputElement>(null)

		useEffect(() => {
			const { current: checkbox } =
				ref as React.MutableRefObject<HTMLInputElement>
			checkbox?.setAttribute("aria-checked", checked ? "true" : "false")
		}, [])

		return (
			<input
				ref={ref}
				type="checkbox"
				className={cn(styles.root)}
				disabled={disabled}
				defaultChecked={defaultChecked}
				required={required}
				aria-required={required ? "true" : "false"}
				aria-invalid={invalid ? "true" : "false"}
				onChange={onChange}
				checked={checked}
				name={value as string}
				{...props}
			/>
		)
	}
)
