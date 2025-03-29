import { useSystem } from "@/stores/system.store";
import styles from "@/styles/components/desktop.module.css";
import Image from "next/image";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	name: string;
	icons: { 32: string; 16: string };
}

export const ExplorerIcon: React.FC<Props> = ({ name, icons, ...props }) => {
	return (
		<button
			type="button"
			title={name}
			className={styles.explorerIcon}
			{...props}
		>
			<Image src={icons[32]} width={32} height={32} alt={name} />
			<div className={styles.name}>{name}</div>
		</button>
	);
};

export const ExplorerView = () => {
	const { desktop } = useSystem();

	return (
		<div className={styles.explorerView}>
			{desktop.map((application) => (
				<ExplorerIcon key={application.id} {...application} />
			))}
		</div>
	);
};
