export const Icon: React.FC<{
	name: string;
	size?: number;
	className?: string;
	title?: string;
}> = ({ name, size = 32, className, title }) => {
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={`/icons/${name}.png`}
			width={size}
			height={size}
			alt={`${name} icon`}
			className={className}
			title={title}
		/>
	);
};
