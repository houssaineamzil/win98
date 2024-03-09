export enum SystemScreen {
	BOOT = "BOOT",
	LOGIN = "LOGIN",
	HOME = "HOME",
}

export interface SystemStore {
	screen: SystemScreen
	setScreen: (screen: SystemScreen) => void
}
