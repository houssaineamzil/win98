import React from "react"
import { Window } from "../components/window"

export const Minesweeper = () => {
	return (
		<>
			<Window
				title="Minesweeper"
				className="minesweeper"
				trigger={
					<div className="program">
						<img
							className="icon"
							alt="windows 98 minesweeper icon"
							src="/assets/apps/minesweeper.png"
						/>
						<span className="name">Minesweeper</span>
					</div>
				}>
				<div
					style={{
						with: 120,
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
							<p>Here goes the Minesweeper Game</p>
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
