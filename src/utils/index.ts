import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const uid = () => Math.random().toString(36).slice(2);

export { playErrorSound } from "./sounds";
export { Window } from "./window";
export * from "./window-animation";
export * from "./window-bounds";
export * from "./window-manager";
