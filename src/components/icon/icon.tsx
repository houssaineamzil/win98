import type React from "react";

type IconName = string;

type Props = {
	name: IconName;
	size?: 16 | 32 | 48;
};

export const Icon: React.FC<Props> = ({ name, size = 16 }) => {
	const iconMap: Record<number, string> = {
		16: `../../assets/icons/${name}-16x16.png`,
		32: `../../assets/icons/${name}-32x32.png`,
		48: `../../assets/icons/${name}-48x48.png`,
	};

	const src = iconMap[size];

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img src={src} width={size} height={size} alt={`${name} icon`} />
	);
};
