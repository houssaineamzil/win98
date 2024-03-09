// import { z } from "zod"

import { StaticImageData } from "next/image"

export type startMenuItem = {
	label: string
	icon?: StaticImageData
	submenu?: startSubMenu
}

export type startSubMenu = startMenuItem[]
