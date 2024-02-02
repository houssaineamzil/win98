import React from "react"
import { redirect, useLocation } from "react-router-dom"
import { Window } from "../components/window"

export const Error = () => {
	const { pathname } = useLocation()

	return (
		<>
			<Window isOpen title="Regsvr32" className="error">
				<div className="content">
					<div className="message">
						<img
							className="icon"
							alt="windows 98 error icon"
							src="/assets/error.png"
						/>
						<div>
							<p>
								Windows couldn't find "<b>{pathname}</b>" in the system, make
								sure you are on the right place.
							</p>
							<p>If you are lost you can go back home with the button below.</p>
						</div>
					</div>
					<div className="actions">
						<button className="button" onClick={() => redirect("/")}>
							Cancel
						</button>
						<button className="button" onClick={() => redirect("/")} autoFocus>
							Ok
						</button>
					</div>
				</div>
			</Window>
		</>
	)
}
