import { proxy } from "valtio"

export const taskbar = proxy({
	pinned: [
		{
			id: "navigator",
			name: "Navigator",
			icon: require("@assets/icons/internet-explorer-16x16.png")
		},
		{
			id: "outlook",
			name: "Outlook",
			icon: require("@assets/icons/outlook-express-16x16.png")
		},
		{
			id: "channels",
			name: "Channels",
			icon: require("@assets/icons/chm-16x16.png")
		},
		{
			id: "desktop",
			name: "Desktop",
			icon: require("@assets/icons/desktop-16x16.png")
		}
	],
	icons: [
		{
			id: "scheduler",
			icon: "/icons/time_and_date-1.png",
			title: "Task Scheduler is not ready."
		},
		{
			id: "volume",
			title: "Volume",
			icon: "/icons/loudspeaker_rays-1.png"
		}
	],
	time: {
		time: new Date(),
		hour12: true,
		locale: "en-US",
		timezone: "Africa/Casablanca"
	}
})

setInterval(() => {
	taskbar.time.time = new Date()
}, 500)
