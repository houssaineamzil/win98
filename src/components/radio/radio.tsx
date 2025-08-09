import styles from "@/styles/components/radio.module.scss";
import { cn } from "@/utils";
import { forwardRef } from "react";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
	invalid?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
	{ value, checked, name, disabled, onChange, required, ...props },
	ref,
) {
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
			onChange={onChange}
			value={value}
			name={name}
			{...props}
		/>
	);
});
