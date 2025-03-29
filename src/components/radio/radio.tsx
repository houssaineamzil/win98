import styles from "@/styles/components/radio.module.css";
import { cn } from "@/utils";
import React, { type InputHTMLAttributes, useEffect, useRef } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
	invalid?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
	function Radio(
		{
			value,
			invalid = false,
			checked,
			name,
			defaultChecked,
			disabled,
			onChange,
			required,
			...props
		},
		ref,
	) {
		ref = ref || useRef<HTMLInputElement>(null);

		useEffect(() => {
			const { current: radio } =
				ref as React.MutableRefObject<HTMLInputElement>;
			radio?.setAttribute("aria-checked", checked ? "true" : "false");
		}, []);

		if (!name) {
			console.warn(
				"A radio input must have a `name` attribute.\nPass `name` as a prop directly to each Radio",
			);
		}

		return (
			<input
				ref={ref}
				type="radio"
				className={cn(styles.root)}
				disabled={disabled}
				checked={checked}
				required={required}
				aria-required={required ? "true" : "false"}
				aria-invalid={invalid ? "true" : "false"}
				onChange={onChange}
				value={value}
				name={name}
				{...props}
			/>
		);
	},
);
