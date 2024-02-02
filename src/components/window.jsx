import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogPortal,
	DialogTrigger,
} from "@radix-ui/react-dialog"
import { forwardRef, useState } from "react"
import Draggable from "react-draggable"

export const Window = forwardRef(
	({ title, trigger, children, isOpen = false, className, ...props }, ref) => {
		const [open, setOpen] = useState(isOpen)

		return (
			<Dialog open={open} onOpenChange={setOpen} modal={false}>
				<DialogTrigger>{trigger}</DialogTrigger>
				<DialogPortal>
					<DialogContent
						ref={ref}
						{...props}
						className="dialog"
						onPointerDownOutside={(event) => {
							event.preventDefault()
						}}>
						<Draggable handle=".title">
							<div className={["window", className]}>
								<div className="title">
									{title}
									<div className="actions">
										<DialogClose className="closeButton" />
									</div>
								</div>
								<div className="body">{children}</div>
							</div>
						</Draggable>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		)
	}
)
