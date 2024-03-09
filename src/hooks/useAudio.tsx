export const UseAudio = (
	audioFile: string,
	delay: number = 0,
	volume: number = 1
) => {
	const play = () => {
		setTimeout(async () => {
			console.log(audioFile)
			const audio = new Audio(audioFile)
			console.log(audio)
			audio.volume = volume
			await audio.play()
		}, delay)
	}

	return {
		play,
	}
}
