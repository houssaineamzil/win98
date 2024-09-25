import { Explorer } from "@programs/explorer/explorer"
import { Task } from "@types"
import { uid } from "@utils"
import { StaticImageData } from "next/image"
import { proxy, useSnapshot } from "valtio"

export const System = proxy<{
	tasks: Record<string, Task>
	activeTask: string | null

	desktop: Array<any>

	settings: {
		wallpaper: StaticImageData | null
	}
}>({
	tasks: {},
	activeTask: null,

	desktop: [
		{
			name: "Internet Explorer",
			icons: {
				32: require("@assets/icons/internet-explorer-32x32.png")
			},
			onClick: () => {},
			onDoubleClick: () => {
				const id = uid()
				System.tasks[id] = {
					id,
					active: true,
					application: Explorer
				}
			},
			onContextMenu: () => {}
		}
	],

	settings: {
		wallpaper: null
	}
})

export const useSystem = (sync?: boolean) => {
	return useSnapshot(System, { sync })
}
