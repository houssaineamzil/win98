import background from "_assets/backgrounds/background.jpg"
import Image from "next/image"
// import {useWindowManager} from '_stores/windowManager'
// import { App } from '_types/apps'

export const Background = () => {
	// const { setFocusWindow } = useWindowManager()

	return (
		// <img
		//   src={background}
		//   onClick={() => setFocusWindow(App.FINDER)}
		//   className='absolute top-0 z-[-1] h-screen w-screen object-cover animate-in fade-in'
		// />
		<Image
			alt=""
			src={background}
			style={{
				top: 0,
				zIndex: -1,
				width: "100dvw",
				height: "100dvh",
				objectFit: "cover",
				position: "absolute",
			}}
		/>
	)
}
