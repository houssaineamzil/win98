import { create } from "zustand";

export const taskbar = create(() => ({
	pinned: [
		{
			id: "navigator",
			name: "Navigator",
			icon: "msie1-4",
		},
		{
			id: "outlook",
			name: "Outlook",
			icon: "outlook_express-3",
		},
		{
			id: "channels",
			name: "Channels",
			icon: "channels-5",
		},
		{
			id: "desktop",
			name: "Desktop",
			icon: "desktop_old-4",
		},
	],
	icons: [
		{
			id: "scheduler",
			icon: "time_and_date-1",
			title: "Task Scheduler is not ready.",
		},
		{
			id: "volume",
			title: "Volume",
			icon: "loudspeaker_rays-1",
		},
	],
	time: {
		time: new Date(),
	},
}));

setInterval(() => {
	taskbar.setState((prev) => {
		return {
			...prev,
			time: {
				...prev.time,
				time: new Date(),
			},
		};
	});
}, 10);
