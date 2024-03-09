import { Desktop } from "_components/apps/desktop"
import { Background } from "_components/background"
import { TaskBar } from "_components/taskbar"

export const HomeScreen = () => {
	return (
		<>
			<Desktop />
			<TaskBar />
			<Background />
		</>
	)
}
