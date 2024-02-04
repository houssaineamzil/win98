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
				<div
					style={{
						with: 525,
						height: 200,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					className="content">
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
						<a
							className="button"
							href="https://github.com/houssaineamzil/Win-98"
							autoFocus>
							Ok
						</a>
					</div>
				</div>
			</Window>
		</>
	)
}
