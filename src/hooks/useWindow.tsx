import type { TaskType } from "@/types";

import { useSystem } from "@/stores/system.store";
import type { RndDragCallback, RndResizeCallback } from "react-rnd";

export const useWindow = (task: TaskType) => {
	const { tasks, activeTask } = useSystem();
	const window = task.window;
	const close = () => {
		const rest = Object.fromEntries(
			Object.entries(tasks).filter(([id]) => id !== task.id),
		);

		useSystem.setState((state) => ({
			...state,
			tasks: rest,
			activeTask:
				Object.values(tasks)[Object.keys(tasks).indexOf(task.id) - 1]?.id ??
				null,
		}));
	};

	const active = activeTask === task.id;
	const minimized = window.minimized || false;

	const focus = () => {
		useSystem.setState((state) => ({
			...state,
			tasks: {
				...state.tasks,
				[task.id]: {
					...task,
					window: {
						...window,
						active: true,
					},
				},
			},
			activeTask: task.id,
		}));
	};

	const minimize = () => {
		useSystem.setState((state) => ({
			...state,
			tasks: {
				...state.tasks,
				[task.id]: {
					...task,
					window: {
						...window,
						active: false,
						minimized: true,
					},
				},
			},
			activeTask:
				Object.values(tasks)[Object.keys(tasks).indexOf(task.id) - 1]?.id ??
				null,
		}));
	};

	const unminimize = () => {
		if (window.minimized) {
			useSystem.setState((state) => ({
				...state,
				tasks: {
					...state.tasks,
					[task.id]: {
						...task,
						window: {
							...window,
							active: true,
							minimized: false,
						},
					},
				},
				activeTask: task.id,
			}));
		}
	};

	const maximize = () => {
		console.log("Maximizing window", task.id);
		if (!window.maximized) {
			useSystem.setState((state) => ({
				...state,
				tasks: {
					...state.tasks,
					[task.id]: {
						...task,
						window: {
							...window,
							maximized: true,
							size: {
								width: global.window.innerWidth,
								height: global.window.innerHeight - 38,
							},
							position: {
								x: 0,
								y: 0,
							},
						},
					},
				},
			}));
		}
	};

	const restore = () => {
		if (window.maximized) {
			useSystem.setState((state) => ({
				...state,
				tasks: {
					...state.tasks,
					[task.id]: {
						...task,
						window: {
							...window,
							maximized: false,
							size: task.application.size,
							position: task.application.position,
						},
					},
				},
			}));
		}
	};

	const move = (position: { x: number; y: number }) => {
		useSystem.setState((state) => ({
			...state,
			tasks: {
				...state.tasks,
				[task.id]: {
					...task,
					window: {
						...window,
						position,
					},
				},
			},
		}));
	};

	const resize = (size: { width: number; height: number }) => {
		if (task.application.resizable && window.resizable)
			useSystem.setState((state) => ({
				...state,
				tasks: {
					...state.tasks,
					[task.id]: {
						...task,
						window: {
							...window,
							size,
						},
					},
				},
			}));
	};

	const fullscreen = () => {
		if (!window.isFullscreen)
			useSystem.setState((state) => ({
				...state,
				tasks: {
					...state.tasks,
					[task.id]: {
						...task,
						window: {
							...window,
							maximized: true,
							size: {
								width: global.window.innerWidth,
								height: global.window.innerHeight,
							},
							position: {
								x: 0,
								y: 0,
							},
						},
					},
				},
			}));
	};

	const onDrag: RndDragCallback = (event, data) => {
		move(data);
		task.application.onDrag?.(event, data);
	};

	const onResize: RndResizeCallback = (
		event,
		direction,
		ref,
		delta,
		position,
	) => {
		resize({
			width: Number(ref.style.width),
			height: Number(ref.style.height),
		});

		task.application.onResize?.(event, direction, ref, delta, position);
	};

	return {
		...window,
		active,
		close,
		focus,
		minimize,
		unminimize,
		minimized,
		maximize,
		restore,
		fullscreen,
		onDrag,
		onResize,
	};
};
