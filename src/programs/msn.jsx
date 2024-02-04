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
				<div className="content">
					<div className="message">
						<img
							className="icon"
							alt="windows 98 error icon"
							src="/assets/error.png"
						/>
						<div>
							<p>Here goes the MSN program</p>
							<p>Feel free to contrebute and make or help making it.</p>
						</div>
					</div>
					<div className="actions">
						<button className="button">Cancel</button>
						<button
							className="button"
							onClick={() =>
								(window.location.href =
									"https://github.com/houssaineamzil/Win-98")
							}
							autoFocus>
							Ok
						</button>
					</div>
				</div>
			</Window>
		</>
	)
}
