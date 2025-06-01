import { cn } from "@/utils";
import React from "react";

import styles from "@/styles/components/window.module.scss";

interface Props {
	left?: React.ReactNode;
	middle?: React.ReactNode;
	right: React.ReactNode;
}

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	width?: string;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(
	{ className, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			{...props}
			className={cn(styles.field, className)}
			style={{ width: props.width }}
		/>
	);
});

export const StatusBar: React.FC<Props> = ({ left, middle, right }) => {
	return (
		<div className={cn(styles.statusBar)}>
			<Field className={cn(styles.field, styles.left)}>{left}</Field>
			<Field className={cn(styles.field, styles.middle)}>{middle}</Field>
			<Field className={cn(styles.field, styles.right)}>{right}</Field>
		</div>
	);
};
