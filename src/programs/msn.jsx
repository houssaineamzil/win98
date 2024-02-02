import React from "react"
import { Window } from "../components/window"

export const MSN = () => {
	return (
		<>
			<Window
				title="MSN"
				trigger={
					<div className="program">
						<img
							className="icon"
							alt="windows 98 msn icon"
							src="/assets/apps/msn.png"
						/>
						<span className="name">MSN</span>
					</div>
				}>
				<div style={{ with: 120, height: 200 }}></div>
			</Window>
		</>
	)
}
