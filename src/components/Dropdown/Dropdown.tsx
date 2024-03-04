import { ChangeEvent } from "react";
import "./DropdownStyles.css";

interface DropdownProps {
  items: string[];
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const Dropdown = (props: DropdownProps) => {
  const { items } = props;

  return (
    <select {...props}>
      {items.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
