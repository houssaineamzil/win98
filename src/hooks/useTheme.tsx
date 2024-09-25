import React, { createContext, useContext } from "react"

const Context = createContext(null)
export const useTheme = () => useContext(Context)

export const Theme = ({
	theme,
	children
}: {
	theme: any
	children: React.ReactNode
}) => {
	return <Context.Provider value={theme}>{children}</Context.Provider>
}
