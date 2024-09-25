"use client"

import { Desktop } from "@components/desktop"
import { Taskbar } from "@components/taskbar"
import { NextPage } from "next"
import { useEffect } from "react"

const Page: NextPage = () => {
	useEffect(() => {
		window.addEventListener("contextmenu", (event) => event.preventDefault())

		return () => {
			window.removeEventListener("contextmenu", (event) =>
				event.preventDefault()
			)
		}
	}, [])

	return (
		<>
			<Desktop />
			<Taskbar />
		</>
	)
}

export default Page
