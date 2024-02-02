import { useState, useEffect } from "react"
import "./style.scss"
import { Computer } from "./programs/computer"
import { Error } from "./programs/error"
import { Trash } from "./programs/trash"
import { MSN } from "./programs/msn"
import { Minesweeper } from "./programs/minesweeper"
import { tabsStore } from "./store"
import { StartMenu } from "./components/start"

export const Home = () => {
	const [localTime, setLocalTime] = useState(new Date())
	const { current } = tabsStore()

	useEffect(() => {
		const interval = setInterval(() => {
			setLocalTime(new Date())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const formattedTime = localTime.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
	})

	return (
		<>
			<Error />
			<div className="desktop">
				<div className="programs">
					<Computer />
					<Trash />
					<MSN />
					<Minesweeper />
				</div>
			</div>
			<div className="taskbar">
				<StartMenu />
				<div className="separator" />
				<div className="attachements">
					<button className="app navigator" />
					<button className="app outlook" />
					<button className="app channels" />
					<button className="app desktop" />
				</div>
				<div className="separator" />
				<div className="tabs">
					{current.map((tab) => {
						return (
							<button className={`tab${tab.inactive ? " inactive" : ""}`}>
								{tab.name}
							</button>
						)
					})}
				</div>
				<div className="time">{formattedTime}</div>
			</div>
		</>
	)
}
