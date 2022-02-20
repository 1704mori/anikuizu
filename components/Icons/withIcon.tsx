export const withIcon = (Icon: any) =>
  function IconWrapper({
    color = "black",
    size = 3,
  }: {
    size?: number;
    color?: string;
  }) {
    return (
      <Icon fill={`${color}`} width={`${size}rem`} height={`${size}rem`} />
    );
  };
