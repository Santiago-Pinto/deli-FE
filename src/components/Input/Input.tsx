import { ChangeEvent } from "react";
import "./InputStyles.css";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  name: string;
  type: string;
  errorMessage?: string;
  onBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const Input = (props: InputProps) => {
  const { errorMessage } = props;

  return (
    <>
      <input {...props} className={!!errorMessage ? "inputError" : undefined} />
      {!!errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </>
  );
};
