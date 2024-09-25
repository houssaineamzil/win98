import React from "react"
import "@styles/globals.scss"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Windows 98",
	description: ""
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<body>{children}</body>
		</html>
	)
}

export default RootLayout
