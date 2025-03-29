import type React from "react";

export const Icon: React.FC<{ name: string }> = ({ name }) => {
	return (
		<img
			src={`/icons/${name}.png`}
			width={48}
			height={48}
			alt={`${name} icon`}
		/>
	);
};
