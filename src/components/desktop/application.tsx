import styles from "@/styles/components/desktop.module.css";
import Image from "next/image";

interface Props {
	name: string;
	icon: string;
}
export const Application: React.FC<Props> = ({ name, icon }) => {
	const open = () => {};

	return (
		<button
			type="button"
			title={name}
			className={styles.explorerIcon}
			onClick={open}
		>
			<Image src={icon} width={32} height={32} alt={name} />
			<div className={styles.name}>{name}</div>
		</button>
	);
};
