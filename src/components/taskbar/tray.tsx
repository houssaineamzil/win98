"use client"

// Imports
import volume from "_assets/icons/loudspeaker.png"
import scheduler from "_assets/icons/sched_task.png"
import { currentDate, currentTime } from "_utils/dateTime"
import Image from "next/image"
import { useEffect, useState } from "react"

// Styles
import styles from "_styles/components/taskbar/tray.module.scss"

// Types

// Logic

export const Tray = () => {
	const [time, setTime] = useState(currentTime())
	const [date, setDate] = useState(currentDate())

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(currentTime())
			setDate(currentDate())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	// console.log(currentDate())

	return (
		<div className={styles.tray}>
			<button className={styles.scheduler}>
				<Image src={scheduler} className={styles.icon} alt="scheduler icon" />
			</button>
			<button className={styles.volume}>
				<Image src={volume} className={styles.icon} alt="volume icon" />
			</button>
			<div className={styles.time} title={date}>
				{time}
			</div>
		</div>
	)
}
