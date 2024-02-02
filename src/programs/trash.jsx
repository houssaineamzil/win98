import React from "react"
import { Window } from "../components/window"

export const Trash = () => {
	return (
		<>
			<Window
				title="Recycle Bin"
				trigger={
					<div className="program">
						<img
							className="icon"
							alt="windows 98 trash icon"
							src="/assets/apps/trash.png"
						/>
						<span className="name">Recycle Bin</span>
					</div>
				}>
				<div style={{ with: 120, height: 200 }}></div>
			</Window>
		</>
	)
}
