import React from "react"
import { Window } from "../components/window"

export const Computer = () => {
	return (
		<>
			<Window
				title="My Computer"
				trigger={
					<div className="program">
						<img
							className="icon"
							alt="windows 98 computer icon"
							src="/assets/apps/computer.png"
						/>
						<span className="name">My Computer</span>
					</div>
				}>
				<div style={{ with: 120, height: 200 }}></div>
			</Window>
		</>
	)
}
