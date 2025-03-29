import { useEffect } from "react";

export const useEventListener = (
	element: Element,
	event: keyof ElementEventMap,
	listener: (this: Element, event: Event) => any,
	options?: boolean | AddEventListenerOptions,
) => {
	useEffect(() => {
		element.addEventListener(event, listener, options);
		return () => element.removeEventListener(event, listener, options);
	}, []);
};
