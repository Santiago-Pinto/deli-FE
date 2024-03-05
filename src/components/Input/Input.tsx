import { ChangeEvent, useEffect, useState } from "react";
import "./InputStyles.css";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  name: string;
  type: string;
  validate?: (value: string) => string;
}

export const Input = (props: InputProps) => {
  const { validate, value, onChange } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const checkErrors = () => {
    if (!!validate) {
      setErrorMessage(validate(value));
    }
  };

  return (
    <>
      <input
        {...props}
        className={!!errorMessage ? "inputError" : undefined}
        onBlur={checkErrors}
        onChange={(val) => {
          onChange(val);
          setErrorMessage("");
        }}
      />
      {!!errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </>
  );
};
