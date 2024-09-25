import { useSystem } from "@stores/system.store"
import styles from "@styles/components/desktop.module.scss"
import Image from "next/image"

export const ExplorerIcon = ({
	name,
	icons,
	onClick,
	onDoubleClick,
	onContextMenu
}: any) => {
	return (
		<button
			title={name}
			className={styles.explorerIcon}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			onContextMenu={onContextMenu}>
			<Image src={icons[32]} width={32} height={32} alt={name} />
			<div className={styles.name}>{name}</div>
		</button>
	)
}

export const ExplorerView = () => {
	const { desktop } = useSystem()

	return (
		<div className={styles.explorerView}>
			{desktop.map((application, index) => (
				<ExplorerIcon key={index} {...application} />
			))}
		</div>
	)
}
