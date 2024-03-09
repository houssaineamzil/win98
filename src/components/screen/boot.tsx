"use client"

import React, { useEffect } from "react"
import { useSystem } from "_stores/system"
import { SystemScreen } from "_types/store"
import { UseAudio } from "_hooks/useAudio"
import Image from "next/image"
import background from "_assets/backgrounds/boot.jpg"
import styles from "_styles/screen/boot.module.scss"

export const BootScreen = () => {
	const { play } = UseAudio("../../assets/sounds/startup.mp3", 0, 0.5)
	const { setScreen } = useSystem()

	useEffect(() => {
		setTimeout(() => {
			setScreen(SystemScreen.HOME)
		}, 0)
	}, [])

	return (
		<div className={styles.boot} onMouseDown={play}>
			<Image
				alt=""
				src={background}
				style={{
					width: "100dvw",
					height: "100dvh",
					objectFit: "cover",
					position: "absolute",
				}}
			/>
		</div>
	)
}
