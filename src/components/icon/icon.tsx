export const Icon: React.FC<{
  name: string;
  size?: number;
  className?: string;
  title?: string;
}> = ({ name, size = 32, className, title }) => {
  return (
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
