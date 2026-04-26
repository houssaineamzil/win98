// Play Windows 98 error sound from WAV file
export const playErrorSound = () => {
  try {
    const audio = new Audio("/audio/CHORD.wav");
    audio.play().catch(() => {
      // Audio playback failed, ignore
    });
  } catch {
    // Audio not available, ignore
  }
};
