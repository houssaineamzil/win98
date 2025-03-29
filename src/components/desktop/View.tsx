import { Applications } from "@/constants/shared";
import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/desktop.module.css";
import type { ApplicationType } from "@/types";
import { cn, uid } from "@/utils";
import { Window } from "@/utils/window";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export const Icon: React.FC<{ application: ApplicationType }> = ({
	application,
}) => {
	const ref = useRef<HTMLButtonElement | null>(null);
	const [isFocus, setIsFocus] = useState(false);
	const { activeTask, tasks } = useSystem();

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (ref.current && !ref.current?.contains(event.target as Node)) {
			setIsFocus(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [handleClickOutside]);

	const open = () => {
		const taskID = uid();

		const window = new Window({
			title: application.name,
			icon: application.icon,
			position: {
				x: activeTask
					? tasks[activeTask]?.window.position.x + 7
					: application.position.x,
				y: activeTask
					? tasks[activeTask]?.window.position.y + 7
					: application.position.y,
			},
			size: application.size,
			minSize: application.minSize,
		});

		useSystem.setState((state) => ({
			...state,
			tasks: {
				...state.tasks,
				[taskID]: {
					id: taskID,
					application,
					window,
				},
			},
			activeTask: taskID,
		}));
	};

	const focus = () => {
		setIsFocus(true);
	};

	return (
		<button
			ref={ref}
			type="button"
			title={application.name}
			onClick={focus}
			className={cn(styles.icon, { [styles.focus]: isFocus })}
			onDoubleClick={open}
		>
			<Image
				src={application.icon}
				width={32}
				height={32}
				alt={application.name}
			/>
			<div className={styles.name}>{application.name}</div>
		</button>
	);
};
export const View = () => {
	const { desktop } = useSystem();

	return (
		<div className={styles.view}>
			{desktop.map((app) => {
				const application = Applications[app];
				return <Icon key={application.name} application={application} />;
			})}
		</div>
	);
};
