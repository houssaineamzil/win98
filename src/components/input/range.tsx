import { forwardRef } from "react";
import styles from "@/styles/components/range.module.scss";
import { cn } from "@/utils";

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
