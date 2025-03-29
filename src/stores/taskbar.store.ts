import { create } from "zustand";

export const taskbar = create(() => ({
	pinned: [
		{
			id: "navigator",
			name: "Navigator",
			icon: "/icons/internet-explorer.png",
		},
		{
			id: "outlook",
			name: "Outlook",
			icon: "/icons/outlook_express-3.png",
		},
		{
			id: "channels",
			name: "Channels",
			icon: "/icons/chm-16x16.png",
		},
		{
			id: "desktop",
			name: "Desktop",
			icon: "/icons/desktop-16x16.png",
		},
	],
	icons: [
		{
			id: "scheduler",
			icon: "/icons/time_and_date-1.png",
			title: "Task Scheduler is not ready.",
		},
		{
			id: "volume",
			title: "Volume",
			icon: "/icons/loudspeaker_rays-1.png",
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
