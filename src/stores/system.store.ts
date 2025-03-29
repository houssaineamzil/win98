import { Explorer } from "@/programs/explorer/explorer"
import type { Application, Task } from "@/types"
import { uid } from "@/utils"
import type { StaticImageData } from "next/image"
import { proxy, useSnapshot } from "valtio"

import SKY from "@/assets/wallpapers/blue.jpg"

export const System = proxy<{
	tasks: Record<string, Task>
	activeTask: string | null

	desktop: Array<Application>

	settings: {
		wallpaper: StaticImageData | null
	}
}>({
	tasks: {},
	activeTask: null,

	desktop: [
		Explorer,
	],

	settings: {
		wallpaper: SKY,
	}
})

export const useSystem = (sync?: boolean) => {
	return useSnapshot(System, { sync })
}
