import type { Window } from "@/types";

import { System, useSystem } from "@/stores/system.store";
import { useState } from "react";
import type { RndDragCallback, RndResizeCallback } from "react-rnd";

export const useWindow = (id: string): Window => {
	const { tasks, activeTask } = useSystem();

	const task = tasks[id];

	const opened = Object.keys(tasks).includes(id);
	const focused = activeTask === id;
	const [minimized, setMinimized] = useState(false);
	const [maximized, setMaximized] = useState(false);
	const resizable = task.application?.resizable;
	const active = opened && !minimized && focused;

	const [size, setSize] = useState(task.application?.size);
	const [position, setPosition] = useState(task.application?.position);

	const open = () => {
		return;
	};

	const close = () => {
		delete System.tasks[id];
	};

	const focus = () => {
		if (!focused) System.activeTask = id;
	};

	const minimize = () => {
		return setMinimized(true);
	};

	const unminimize = () => {
		return setMinimized(false);
	};

	const maximize = () => {
		if (!maximized) {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight - 38,
			});
			setPosition({ x: 0, y: 0 });
			return setMaximized(true);
		}
	};

	const restore = () => {
		if (maximized) {
			setSize(task.application?.size);
			setPosition(task.application?.position);
			return setMaximized(false);
		}
	};

	const move = (position: { x: number; y: number }) => {
		return setPosition(position);
	};

	const resize = (size: {
		width: number | string;
		height: number | string;
	}) => {
		return resizable && setSize(size);
	};

	const onDrag: RndDragCallback = (event, data) => {
		setPosition({
			x: data.x,
			y: data.y,
		});
		task.application?.onDrag?.(event, data);
	};

	const onResize: RndResizeCallback = (
		event,
		direction,
		ref,
		delta,
		position,
	) => {
		setSize({
			width: ref.style.width,
			height: ref.style.height,
		});
		task.application?.onResize?.(event, direction, ref, delta, position);
	};

	return {
		id: id,
		title: task.application?.name,
		icons: task.application?.icons,

		active,
		focused,
		minimized,
		resizable,
		maximized,

		size,
		minSize: task.application?.minSize,
		position,

		toolWindow: task.application?.toolWindow,
		maximizeButton: task.application?.maximizeButton,
		minimizeButton: task.application?.minimizeButton,
		closeButton: task.application?.closeButton,

		open,
		close,
		focus,
		minimize,
		unminimize,
		maximize,
		restore,
		move,
		resize,

		onResize,
		onDrag,
	};
};
