import styles from "@/styles/components/checkbox.module.scss";
import { cn } from "@/utils";
import { forwardRef, useEffect, useRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	invalid?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
		forwardedRef,
	) {
		const inputRef = useRef<HTMLInputElement>(null);
		const ref = forwardedRef || inputRef;

		useEffect(() => {
			const checkbox = ref as React.MutableRefObject<HTMLInputElement>;
			checkbox.current?.setAttribute(
				"aria-checked",
				checked ? "true" : "false",
			);
		}, [ref, checked]);

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
		);
	},
);
