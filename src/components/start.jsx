import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverPortal,
	PopoverTrigger,
} from "@radix-ui/react-popover"
import React from "react"

export const StartMenu = () => {
	return (
		<Popover>
			<PopoverTrigger className="start">
				<img
					className="icon"
					src="/assets/windows.png"
					alt="windows 98 start logo"
				/>
				<span className="label">Start</span>
			</PopoverTrigger>
			<PopoverPortal>
				<PopoverContent>
					<PopoverClose />
				</PopoverContent>
			</PopoverPortal>
		</Popover>
	)
}
