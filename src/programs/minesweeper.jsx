import React, { useEffect } from "react"
import { Window } from "../components/window"

export const Minesweeper = () => {
	const grid = []

	useEffect(() => {
		for (let i = 0; i < 8; ++i) {
			grid.push([])
			for (let j = 0; j < 8; ++j) {
				grid[i][j] = "0"
			}
		}
	}, [])

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
				{grid.map((row) => {
					console.log(row);
					return (
						<>
							{row.map((tile) => {
								return <div>{tile}</div>
							})}
						</>
					)
				})}
			</Window>
		</>
	)
}
