import "./ButtonStyles.css";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  text: string;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { text } = props;

  return (
    <button {...props} className="customBtn">
      {text}
    </button>
  );
};
