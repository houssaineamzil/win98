export const UseAudio = (audioFile: string, delay = 0, volume = 1) => {
	const play = () => {
		setTimeout(async () => {
			const audio = new Audio(audioFile);
			audio.volume = volume;
			await audio.play();
		}, delay);
	};

	return {
		play,
	};
};
