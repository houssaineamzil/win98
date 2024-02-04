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
				<div className="content">
					<div className="message">
						<img
							className="icon"
							alt="windows 98 error icon"
							src="/assets/error.png"
						/>
						<div>
							<p>Here goes the Recycle bin/Trash program</p>
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
