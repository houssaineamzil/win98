export const currentTime = () => {
	return new Date().toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
	})
}

export const currentDate = () => {
	return new Date().toLocaleString([], {
		weekday: "long",
		month: "long",
		day: "2-digit",
		minute: "2-digit",
		hour: "2-digit",
	})
}
