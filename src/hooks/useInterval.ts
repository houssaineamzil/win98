import { type DependencyList, useEffect } from "react"

export const useInterval = (
	callback: () => void,
	ms?: number,
	inputs?: DependencyList
) => {
	useEffect(() => {
		const interval = setInterval(callback, ms)
		return () => clearInterval(interval)
	}, [callback, ms, inputs])
}
