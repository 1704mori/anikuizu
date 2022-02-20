import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children?: string;
  color?: string;
  size?: "small" | "medium" | "large";
  type?: string;
  ghost?: boolean;
  className?: string;
}

const ButtonStyle = styled.button`
  &.small {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }

  &.medium {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }

  &.large {
    font-size: 1.25rem;
    padding: 1rem 2rem;
  }

  &.ghost {
    background-color: transparent;
    border: 1px solid #2e51a2;

    &:hover {
      background-color: #2e51a2;
    }
  }

  &:focus {
    outline: none;
  }
`;

export default function Button(props: Props) {
  const {
    children,
    color = "primary",
    size = "small",
    type = "button",
    ghost = false,
    className = "",
    ...rest
  } = props;

  return (
    <ButtonStyle
      {...rest}
      className={`
				${color}
				${size}
				${ghost ? "ghost" : ""}
				${type}
				rounded-[5px]
				text-white
				bg-primary-100
				hover:bg-primary-200
				focus:bg-primary-100
				focus:outline-none
				transition-all
				duration-200
				ease-in-out
				${className}
			`}
    >
      {children}
    </ButtonStyle>
  );
}
