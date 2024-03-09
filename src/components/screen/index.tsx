"use client"

import { BootScreen } from "./boot"
import { LoginScreen } from "./login"
import { HomeScreen } from "./home"
import { useSystem } from "_stores/system"


import { SystemScreen } from "_types/store"

export const Screen = () => {
	const { screen } = useSystem()

	const screens = {
		[SystemScreen.BOOT]: BootScreen,
		[SystemScreen.LOGIN]: LoginScreen,
		[SystemScreen.HOME]: HomeScreen,
	}
	const CurrentScreen = screens[screen]

	return <CurrentScreen />
}
