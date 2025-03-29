import { type DependencyList, useEffect } from "react";

export const useTimeout = (
	callback: () => void,
	ms?: number,
	deps?: DependencyList,
) => {
	useEffect(() => {
		const timeout = setTimeout(callback, ms);
		return () => clearTimeout(timeout);
	}, deps);
};
