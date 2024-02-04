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
				<div className="content">
					<div className="message">
						<img
							className="icon"
							alt="windows 98 error icon"
							src="/assets/error.png"
						/>
						<div>
							<p>Here goes the File Explorer program</p>
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
